#include "Pass.h"
#include "instrumentation/Store.h"
#include "util/Types.h"
#include "instrumentation/KernelLaunch.h"

#include <llvm/IR/Module.h>
#include <llvm/IR/IRBuilder.h>
#include <Target/NVPTX/NVPTXUtilities.h>
#include <llvm/Transforms/Utils/Cloning.h>
#include <iostream>

using namespace llvm;

char CudaPass::ID = 0;

CudaPass::CudaPass(): ModulePass(CudaPass::ID)
{

}

bool CudaPass::runOnModule(Module& module)
{
    std::cerr << "Run on module: " << module.getName().str() << " " << module.getTargetTriple() << std::endl;

    bool cuda = module.getTargetTriple() == "nvptx64-nvidia-cuda";
    cuda ? this->instrumentCuda(module) : this->instrumentCpp(module);

    return false;
}

void CudaPass::instrumentCuda(Module& module)
{
    for (Function& fn : module.getFunctionList())
    {
        if (isKernelFunction(fn))
        {
            StoreHandler handler;
            handler.handleKernel(&fn);
        }
    }
}

Function* CudaPass::augmentKernel(Function* fn)
{
    if (this->kernelMap.find(fn) == this->kernelMap.end())
    {
        FunctionType *type = fn->getFunctionType();
        std::vector<Type *> arguments;
        arguments.insert(arguments.end(), type->param_begin(), type->param_end());
        arguments.push_back(Types::int32(fn->getParent()));

        FunctionType *newType = FunctionType::get(type->getReturnType(), arguments, type->isVarArg());

        Function *augmented = Function::Create(newType, fn->getLinkage(), fn->getName().str() + "_clone");
        fn->getParent()->getFunctionList().push_back(augmented);

        ValueToValueMapTy map;

        auto newArgs = augmented->arg_begin();
        for (auto args = fn->arg_begin(); args != fn->arg_end(); ++args, ++newArgs) {
            map[&(*args)] = &(*newArgs);
            newArgs->setName(args->getName());
        }

        SmallVector<ReturnInst *, 100> returns;
        CloneFunctionInto(augmented, fn, map, true, returns);
        // TODO: CloneDebugInfoMetadata

        augmented->setCallingConv(fn->getCallingConv());

        this->kernelMap[fn] = augmented;
        return augmented;
    }

    return this->kernelMap[fn];
}

void CudaPass::instrumentCpp(Module& module)
{
    for (Function& fn : module.getFunctionList())
    {
        for (BasicBlock& bb : fn.getBasicBlockList())
        {
            for (Instruction& inst : bb.getInstList())
            {
                if (auto* call = dyn_cast<CallInst>(&inst))
                {
                    auto calledFn = call->getCalledFunction();
                    if (calledFn != nullptr && calledFn->getName() == "cudaLaunch")
                    {
                        KernelLaunch kernelLaunch;
                        kernelLaunch.handleKernelLaunch(call);
                    }
                }
            }
        }
    }
}
