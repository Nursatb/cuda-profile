#pragma once

#include <cstddef>
#include "AddressSpace.h"
#include "cudautil.h"


struct AllocRecord
{
public:
    AllocRecord() = default;
    __universal__ AllocRecord(void* address, size_t size, size_t elementSize,
                AddressSpace addressSpace, const char* type)
            : address(address), size(size), elementSize(elementSize),
              addressSpace(addressSpace), type(type)
    {

    }

    void* address = nullptr;
    size_t size = 0;
    size_t elementSize = 0;
    const char* type = nullptr;
    bool active = true;
    AddressSpace addressSpace = AddressSpace::Global;
};
