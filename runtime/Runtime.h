#pragma once

#include <cstddef>
#include <vector>
#include <iostream>

#include <device_launch_parameters.h>

#include "prefix.h"
#include "AccessRecord.h"
#include "AllocRecord.h"
#include "format.h"

#define BUFFER_SIZE 1024

static AccessRecord* deviceRecords = nullptr;
static size_t kernelCounter = 0;
static std::vector<AllocRecord> allocations;

__device__ AccessRecord* devRecordsPtr;
__device__ uint32_t devRecordIndex;

inline static void emitKernelData(const std::string& kernelName,
                           const std::vector<AccessRecord>& records,
                           const std::vector<AllocRecord>& allocations)
{
    std::cerr << "Emmitted " << records.size() << " accesses " << "in kernel " << kernelName << std::endl;

    std::fstream kernelOutput(std::string(kernelName) + "-" + std::to_string(kernelCounter++) + ".json", std::fstream::out);

    Formatter formatter;
    formatter.outputKernelRun(kernelOutput, records, allocations);
    kernelOutput.flush();
}
extern "C" {
    void PREFIX(kernelStart)()
    {
        cudaMalloc((void**) &deviceRecords, sizeof(AccessRecord) * BUFFER_SIZE);

        const uint32_t zero = 0;
        CHECK_CUDA_CALL(cudaMemcpyToSymbol(devRecordsPtr, &deviceRecords, sizeof(deviceRecords)));
        CHECK_CUDA_CALL(cudaMemcpyToSymbol(devRecordIndex, &zero, sizeof(zero)));
    }
    void PREFIX(kernelEnd)(const char* kernelName)
    {
        CHECK_CUDA_CALL(cudaDeviceSynchronize());

        uint32_t count = 0;
        CHECK_CUDA_CALL(cudaMemcpyFromSymbol(&count, devRecordIndex, sizeof(uint32_t)));

        std::vector<AccessRecord> records(count);
        CHECK_CUDA_CALL(cudaMemcpy(records.data(), deviceRecords, sizeof(AccessRecord) * count, cudaMemcpyDeviceToHost));
        CHECK_CUDA_CALL(cudaFree(deviceRecords));

        emitKernelData(kernelName, records, allocations);
    }
    void PREFIX(malloc)(void* address, size_t size, size_t elementSize, const char* type)
    {
        allocations.emplace_back(address, size, elementSize, type);
    }
    void PREFIX(free)(void* address)
    {
        for (auto& alloc: allocations)
        {
            if (alloc.address == address)
            {
                alloc.active = false;
            }
        }
    }

    __forceinline__ __device__ uint32_t warpid()
    {
        uint32_t ret;
        asm volatile ("mov.u32 %0, %%warpid;" : "=r"(ret));
        return ret;
    }
    extern "C" __device__ void PREFIX(store)(void* address, size_t size, const char* type, int32_t debugIndex)
    {
        uint32_t index = atomicInc(&devRecordIndex, BUFFER_SIZE);
        devRecordsPtr[index] = AccessRecord(AccessType::Write, blockIdx, threadIdx, warpid(), address, size,
                                            static_cast<int64_t>(clock64()), type, debugIndex);
    }
    extern "C" __device__ void PREFIX(load)(void* address, size_t size, const char* type, int32_t debugIndex)
    {
        uint32_t index = atomicInc(&devRecordIndex, BUFFER_SIZE);
        devRecordsPtr[index] = AccessRecord(AccessType::Read, blockIdx, threadIdx, warpid(), address, size,
                                            static_cast<int64_t>(clock64()), type, debugIndex);
    }
}
