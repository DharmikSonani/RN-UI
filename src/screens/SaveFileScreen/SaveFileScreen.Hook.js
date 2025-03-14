import { useEffect, useState } from "react";
import useFilePermissions from "./hooks/useFilePermissions";
import { Alert, Platform } from "react-native";
import { saveFileToiOS, saveFileToMedia } from "./hooks/saveFileHelper";

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;
    const { requestFilePermission } = useFilePermissions();
    const demoUrls = [
        'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
        'https://images7.alphacoders.com/137/1378048.png',
        'https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg',
        'https://4kwallpapers.com/images/wallpapers/your-name-shooting-3840x2160-14938.jpg',
        'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg',
        'https://cdn.pixabay.com/video/2024/10/14/236316_large.mp4',
        'https://cdn.pixabay.com/video/2024/08/16/226795_large.mp4',
        'https://cdn.pixabay.com/video/2025/01/19/253436_large.mp4',
        'https://cdn.pixabay.com/video/2024/10/06/234930_large.mp4',
    ]

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
        demoUrls,

        url, setUrl,

        onSavePress,
    };
}

export default useScreenHooks