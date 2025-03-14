import { useEffect, useState } from "react";
import useFilePermissions from "./hooks/useFilePermissions";
import { Alert, Platform } from "react-native";
import { saveFileToiOS, saveFileToMedia } from "./hooks/saveFileHelper";

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;
    const { requestFilePermission } = useFilePermissions();

    // useStates
    const [url, setUrl] = useState('');

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
        Platform.OS == 'android' ? await saveFileToMedia(url, 'image') : await saveFileToiOS(url, 'image');
        setUrl('');
    }

    return {
        navigation,
        onSavePress,

        url, setUrl,
    };
}

export default useScreenHooks