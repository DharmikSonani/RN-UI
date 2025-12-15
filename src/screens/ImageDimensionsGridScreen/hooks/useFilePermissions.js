import { Platform, PermissionsAndroid } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const useImagePickerPermissions = () => {
    const checkPermission = async (type) => {
        const status = await check(type);
        return status === RESULTS.GRANTED;
    };

    const requestImagePickerPermission = async () => {
        let granted = false;
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) return true; // Android 13 or Above
            const androidPermissions = [
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
            ]
            const results = await PermissionsAndroid.requestMultiple(androidPermissions);
            granted = Object.values(results).every(result => result === PermissionsAndroid.RESULTS.GRANTED);
        } else {
            granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY) === RESULTS.GRANTED;
        }
        return granted;
    };

    return { checkPermission, requestImagePickerPermission };
};