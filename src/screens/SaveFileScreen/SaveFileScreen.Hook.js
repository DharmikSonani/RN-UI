import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useFilePermissions } from "./hooks/useFilePermissions";
import { useStorageManager } from "./hooks/storageManager";
import { downloadAndSaveFileInDevice } from "./hooks/fileStorage";

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;

    const { requestFilePermission } = useFilePermissions();
    const { fileStorageInfo } = useStorageManager({ mainDir: '/Download/appName/' });

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
        'https://firebasestorage.googleapis.com/v0/b/hysun-solar.appspot.com/o/sales-reports%2FJohn%20Doe-2025-03-01.pdf?alt=media&token=3207fafc-e645-45b9-a25f-656b06614058',
    ]

    // useStates
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);

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
        if (!url) return;

        const hasPermission = await requestFilePermission();

        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Enable storage access to save files.');
            return;
        }

        const { fileType, toFilePath } = await fileStorageInfo({ url: url }); // Required for storing a file

        await downloadAndSaveFileInDevice({
            fromUrl: url,
            toFile: toFilePath,
            fileType: fileType,
            progress: setProgress
        });

        setUrl('');
        setProgress(0);
    }

    return {
        navigation,
        demoUrls,
        progress,

        url, setUrl,

        onSavePress,
    };
}

export default useScreenHooks