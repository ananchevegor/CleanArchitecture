import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The native module 'AuthorizationFingerprint' is not linked properly.`;

type AuthorizationFingerprintType = {
  authorization(): Promise<boolean>;
};

const AuthorizationFingerprint = NativeModules.AuthorizationFingerprint as AuthorizationFingerprintType | undefined;

export default AuthorizationFingerprint ?? new Proxy(
  {},
  {
    get() {
      throw new Error(
        Platform.OS === 'android'
          ? LINKING_ERROR
          : "This module is only available on Android"
      );
    },
  }
) as AuthorizationFingerprintType;