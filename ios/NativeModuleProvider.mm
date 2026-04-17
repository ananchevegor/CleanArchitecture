//
//  NativeModuleProvider.m
//  CleanArchitecture
//
//  Created by Egor Ananchev on 17.04.26.
//

#import "NativeModuleProvider.h"
#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>
#import "NativeModule.h"


@implementation NativeModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeModule>(params.jsInvoker);
}

@end
