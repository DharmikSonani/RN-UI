import { useEffect } from "react";
import useFilePermissions from "./hooks/useFilePermissions";
import { Alert, Platform } from "react-native";
import { saveFileToiOS, saveFileToMedia } from "./hooks/saveFileHelper";

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;
    const url = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg';
    const { requestFilePermission } = useFilePermissions();

    // useStates


    // useEffects
    useEffect(() => {
        requestFilePermission().then((granted) => {
            if (!granted) {
                Alert.alert("Permission Required", "File access is needed to save media.");
            }
        });
    }, [])

    // methods
    const onSavePress = async () => {
        // Request storage permission
        const hasPermission = await requestFilePermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Enable storage access to save files.');
            return;
        }
        Platform.OS == 'android' ? saveFileToMedia(url, 'image') : saveFileToiOS(url, 'image');
    }

    return {
        navigation,
        onSavePress,
    };
}

export default useScreenHooks