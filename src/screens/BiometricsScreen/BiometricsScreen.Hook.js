import { Platform, ToastAndroid } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;

    // useStates


    // useEffects


    // methods
    const onPress = () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then((resultObject) => {
                const { success } = resultObject
                if (success) {
                    Platform.OS == 'android' && ToastAndroid.show('Successful biometrics provided', ToastAndroid.SHORT);
                    console.log('Successful biometrics provided')
                } else {
                    Platform.OS == 'android' && ToastAndroid.show('User cancelled biometric prompt', ToastAndroid.SHORT);
                    console.log('User cancelled biometric prompt')
                }
            })
            .catch(() => {
                Platform.OS == 'android' && ToastAndroid.show('Biometrics failed', ToastAndroid.SHORT);
                console.log('Biometrics failed')
            })
    }


    return {
        navigation,
        onPress,
    };
}

export default useScreenHooks