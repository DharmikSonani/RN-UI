import { useCallback, useState } from "react";
import { useImagePickerPermissions } from "./hooks/useFilePermissions";
import ImagePicker from 'react-native-image-crop-picker';

const defaultData = [
    `https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg`,
    `https://st3.depositphotos.com/1005145/15351/i/450/depositphotos_153516954-stock-photo-summer-landscape-with-flowers-in.jpg`,
    `https://smileyworldz.com/wp-content/uploads/2023/11/20250423_111058-1-1024x1024.jpg`,
    `https://img.freepik.com/free-photo/high-angle-man-living-countryside_23-2150642419.jpg?semt=ais_hybrid&w=740&q=80`,
    `https://images.pexels.com/photos/19702201/pexels-photo-19702201/free-photo-of-elegant-man-looking-at-houses.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
    `https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D`,
    `https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg`,
    `https://burst.shopifycdn.com/photos/person-stands-on-rocks-poking-out-of-the-ocean-shoreline.jpg?width=1000&format=pjpg&exif=0&iptc=0`,
    `https://i0.wp.com/picjumbo.com/wp-content/uploads/fall-is-coming-beautiful-autumn-nature-in-the-mountains-free-image.jpeg?w=600&quality=80`,
    `https://i.pinimg.com/236x/94/a7/82/94a782238f7a389f27825fa846c0959b.jpg`,
]

const useScreenHooks = () => {

    // variables
    const { requestImagePickerPermission } = useImagePickerPermissions();

    // useStates
    const [data, setData] = useState(defaultData);


    // useEffects


    // methods
    const handleButtonPress = useCallback(async () => {
        try {
            const storagePermission = await requestImagePickerPermission()
            if (storagePermission) {
                ImagePicker.openPicker({
                    mediaType: 'photo',
                    multiple: true,
                    maxFiles: 300,
                }).then((res) => {
                    res?.map((img) => { setData(pre => ([...pre, img?.path])); })
                }).catch(console.log);
            }
        } catch (e) {
            console.log(e);
        }
    }, [])

    return {
        data,

        handleButtonPress,
    };
}

export default useScreenHooks