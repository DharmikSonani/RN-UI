import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { fileSetup } from './fileManager';

const appName = 'RNUI'; // Your Application Name
const appPackage = 'com.rnui'; // Your Application Package 

/**
 * Get data from the specified main directory.
 * 
 * @param {Object} options - Options object.
 * @param {'/Android/media/appPackage/appName/' | '/Android/data/appPackage/appName/' | '/DCIM/appName/' | 
* '/Documents/appName/' | '/Download/appName/' | '/Movies/appName/' | 
* '/Music/appName/' | '/Notifications/appName/' | '/Pictures/appName/' | 
* '/Podcasts/appName/' | '/Recordings/appName/' | '/Ringtones/appName/' } options.mainDir - The main directory path.
*/

export const getStorageBasePath = ({
    mainDir = '/Android/media/appPackage/appName/'
}) => {
    const mainDirectory = mainDir.replaceAll('appName', appName).replaceAll('appPackage', appPackage)

    const storagePath = Platform.OS == 'android' ? `${RNFS.ExternalStorageDirectoryPath}${mainDirectory}` : RNFS.DocumentDirectoryPath;

    return storagePath;
}

export const getAndroidFileStorePath = async ({ basePath, file, fileType, subDir }) => {
    let folderPath = basePath;

    if (basePath?.startsWith('/Android/media/')) {
        if (subDir && subDir?.trim()) {
            folderPath += `${subDir}/`;
        } else if (fileType === 'image') {
            folderPath += `${appName} Images/`;
        } else if (fileType === 'video') {
            folderPath += `${appName} Video/`;
        } else if (fileType === 'document') {
            folderPath += `${appName} Documents/`;
        } else {
            folderPath += `Other/`;
        }
    } else if (subDir && subDir?.trim()) {
        folderPath += `${subDir}/`;
    }

    await RNFS.mkdir(folderPath);

    return `${folderPath}${file}`;
}

/**
 * Get data from the specified main directory.
 * 
 * @param {Object} options - Options object.
 * @param {'/Android/media/appPackage/appName/' | '/Android/data/appPackage/appName/' | '/DCIM/appName/' | 
* '/Documents/appName/' | '/Download/appName/' | '/Movies/appName/' | 
* '/Music/appName/' | '/Notifications/appName/' | '/Pictures/appName/' | 
* '/Podcasts/appName/' | '/Recordings/appName/' | '/Ringtones/appName/' } options.mainDir - The main directory path.
*/

export const useStorageManager = ({
    mainDir = '/Android/media/appPackage/appName/'
}) => {

    const storagePath = getStorageBasePath({ mainDir });

    const fileStorageInfo = async ({ url, subDir }) => {
        const { fileName, type } = fileSetup(url);

        const toFilePath = Platform.OS == 'android' ? await getAndroidFileStorePath({ basePath: storagePath, file: fileName, fileType: type, subDir: subDir }) : storagePath;

        return {
            toFilePath: toFilePath,
            fileType: type,
        }
    }

    return { storagePath, getAndroidFileStorePath, getStorageBasePath, fileStorageInfo }
}