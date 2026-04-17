#pragma once
#include <AppSpecJSI.h>
#include <memory>
#include <string>
#include <vector>

namespace facebook::react {
    class NativeModule : public NativeModuleCxxSpec<NativeModule> {
    public:
        NativeModule(std::shared_ptr<CallInvoker> jsInvoker);
        double summuryPopulation(jsi::Runtime& rt, std::vector<double> populationArray);
    };
}