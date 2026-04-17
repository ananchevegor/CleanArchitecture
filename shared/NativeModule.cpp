#include "NativeModule.h"

namespace facebook::react {
    NativeModule::NativeModule(std::shared_ptr<CallInvoker> jsInvoker) : NativeModuleCxxSpec(jsInvoker) {}

    double NativeModule::summuryPopulation(jsi::Runtime& rt, std::vector<double> populationArray) {
        double totalPopulation = 0;
        for (double population : populationArray) {
            totalPopulation += population;
        }
        return totalPopulation;
    }
}