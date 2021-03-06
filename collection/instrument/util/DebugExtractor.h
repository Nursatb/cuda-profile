#pragma once

#include <iostream>
#include <unordered_map>
#include <llvm/IR/DebugInfoMetadata.h>

#include "DebugInfo.h"

namespace llvm {
    class Instruction;
    class Function;
    class MDNode;
    class Value;
    class DIVariable;
}

class DebugExtractor
{
public:
    DebugInfo* getDebugInfo(llvm::Value* inst);
    DebugInfo getInstructionLocation(llvm::Instruction* inst);

private:
    const llvm::MDNode* findVarInFunction(const llvm::Function* function, const llvm::Value* value);
    const llvm::Function* findVarScope(const llvm::Value* value);
    std::unique_ptr<DebugInfo> getVarDebugInfo(const llvm::Value* value);
    std::unique_ptr<DebugInfo> getGlobalVarDebugInfo(const llvm::GlobalVariable* global);

    DebugInfo* getFromCache(const llvm::Value* value);

    std::unordered_map<const llvm::Value*, std::unique_ptr<DebugInfo>> debugCache;
};
