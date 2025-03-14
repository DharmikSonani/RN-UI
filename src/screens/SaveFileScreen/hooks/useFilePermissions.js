import { Platform, PermissionsAndroid } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const useFilePermissions = () => {

    const checkPermission = async (type) => {
        try {
            const status = await check(type);
            return status === RESULTS.GRANTED;
        } catch (error) {
            console.error("Permission check error:", error);
            return false;
        }
    };

    const requestFilePermission = async () => {
        let granted = false;

        if (Platform.OS === "android") {
            const androidPermissions = [
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
                PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
            ];

            const results = await PermissionsAndroid.requestMultiple(androidPermissions);
            granted = Object.values(results).every((result) => result === PermissionsAndroid.RESULTS.GRANTED);
        } else {
            granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY) === RESULTS.GRANTED;
        }

        return granted;
    };

    return {
        checkPermission,
        requestFilePermission,
    };
};
