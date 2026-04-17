#include "NativeModule.h"

namespace facebook::react {
    NativeModule::NativeModule(std::shared_ptr<CallInvoker> jsInvoker) : NativeModuleCxxSpec(jsInvoker) {}

    std::string NativeModule::summuryPopulation(jsi::Runtime& rt, std::vector populationArray) {
        int totalPopulation = 0;
        for (int population : populationArray) {
            totalPopulation += population;
        }
        return totalPopulation;
    }
}