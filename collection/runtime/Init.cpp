#include "RuntimeState.h"

namespace cupr
{
    cupr::RuntimeState state;
}

__attribute__((destructor))
static void closeEmitter()
{
    cupr::state.emitter.emitProgramRun();
}
