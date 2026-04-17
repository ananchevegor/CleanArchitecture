import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly summuryPopulation: (population: number[]) => number;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
    'NativeModule',
  );