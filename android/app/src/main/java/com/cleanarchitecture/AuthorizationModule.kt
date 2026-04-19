package com.cleanarchitecture

import androidx.biometric.BiometricManager
import androidx.biometric.BiometricManager.Authenticators.BIOMETRIC_STRONG
import androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil

class AuthorizationFingerprint(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AuthorizationFingerprint"
    }

    @ReactMethod
    fun authorization(promise: Promise) {
        val activity = reactApplicationContext.currentActivity as? FragmentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Current activity is not available")
            return
        }

        val authenticators = BIOMETRIC_STRONG or DEVICE_CREDENTIAL
        val biometricManager = BiometricManager.from(reactContext)
        val availability = biometricManager.canAuthenticate(authenticators)

        if (availability != BiometricManager.BIOMETRIC_SUCCESS) {
            promise.reject(
                "BIOMETRIC_UNAVAILABLE",
                "Biometric authentication is not available. Code: $availability",
            )
            return
        }

        UiThreadUtil.runOnUiThread {
            val executor = ContextCompat.getMainExecutor(activity)
            val biometricPrompt = BiometricPrompt(
                activity,
                executor,
                object : BiometricPrompt.AuthenticationCallback() {
                    override fun onAuthenticationSucceeded(
                        result: BiometricPrompt.AuthenticationResult,
                    ) {
                        promise.resolve(true)
                    }

                    override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                        promise.reject("AUTH_ERROR", "$errorCode: $errString")
                    }

                    override fun onAuthenticationFailed() {
                        // User touched the sensor, but authentication was not accepted yet.
                    }
                },
            )

            val promptInfo = BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric authorization")
                .setSubtitle("Try biometric credential here to unlock the app")
                .setAllowedAuthenticators(authenticators)
                .build()

            biometricPrompt.authenticate(promptInfo)
        }
    }
}
