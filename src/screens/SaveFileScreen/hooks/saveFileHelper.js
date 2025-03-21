import RNFS from 'react-native-fs';
import { Alert, NativeModules, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';

const appName = 'RNUI'; // Your Application Name
const appPackage = 'com.rnui'; // Your Application Package 

const getFileType = (extension) => {
  if (!extension) return 'unknown';

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'heic'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'rtf'];

  if (imageExtensions.includes(extension?.toLowerCase())) {
    return 'image';
  } else if (videoExtensions.includes(extension?.toLowerCase())) {
    return 'video';
  } else if (documentExtensions.includes(extension?.toLowerCase())) {
    return 'document';
  } else {
    return 'other';
  }
};

export const fileSetup = (file, newName) => {
  const fileInfo = file?.split('/')?.pop()?.split('?')?.[0]?.replaceAll('%20', ' ')?.split('%2F')?.pop()?.split('.');
  const fileName = newName ? `${newName}.${fileInfo[1]}` : `${fileInfo[0]}.${fileInfo[1]}`;
  const type = getFileType(fileInfo?.pop());
  return { fileName, type };
}

export const baseStoragePath = ({ file, subDir = 'Media' }) => Platform.OS == 'android' ? `${RNFS.ExternalStorageDirectoryPath}/Android/media/${appPackage}/${appName}/${subDir}` : `${RNFS.DocumentDirectoryPath}/${file}`;

export const androidFileStorePath = async ({ basePath, file, fileType }) => {
  let folderPath;
  if (fileType === 'image') {
    folderPath = `${basePath}/${appName} Images/`;
  } else if (fileType === 'video') {
    folderPath = `${basePath}/${appName} Video/`;
  } else if (fileType === 'document') {
    folderPath = `${basePath}/${appName} Documents/`;
  } else {
    folderPath = `${basePath}/Other/`;
  }

  await RNFS.mkdir(folderPath);

  return `${folderPath}${file}`;
}

// From Url / Server to Media Folder

export const downloadFileAndStore = async ({ fromUrl, toFile, progress = () => { } }) => {
  const downloadResult = await RNFS.downloadFile({
    fromUrl: fromUrl,
    toFile: toFile,
    background: true,
    progress: (res) => { progress(((res.bytesWritten / res.contentLength) * 100).toFixed(2)); },
  }).promise;

  return downloadResult;
}

export const downloadAndSaveFileInDevice = async ({ fileUrl, newName, progress = () => { } }) => {
  try {
    const { fileName, type } = fileSetup(fileUrl, newName);

    const basePath = baseStoragePath({ file: fileName, subDir: 'Media' });
    const toFilePath = Platform.OS == 'ios' ? basePath : await androidFileStorePath({ file: fileName, fileType: type, basePath: basePath });

    const downloadResult = await downloadFileAndStore({ fromUrl: fileUrl, toFile: toFilePath, progress: progress });

    if (downloadResult.statusCode === 200) {
      if (Platform.OS === 'android') {
        const { RNMediaScanner } = NativeModules;
        RNMediaScanner && RNMediaScanner.scanFile(toFilePath);
      }
      if (Platform.OS === 'ios') {
        if (type === 'image' || type === 'video') {
          await CameraRoll.save(toFilePath, { type });
        } else {
          RNFetchBlob.ios.previewDocument(toFilePath);
        }
      }
      Alert.alert('Success', 'File downloaded and saved successfully.');
    } else {
      Alert.alert('Failed', 'Download failed with status ' + downloadResult.statusCode);
    }
  } catch (error) {
    console.log('Error saving file:', error);
    Alert.alert('Error', 'Failed to download and save file.');
  }
};

// From Internal Storage to Media Folder

export const moveFileAndStore = async ({ fromUrl, toFile, }) => {
  const fileExists = await RNFS.exists(toFile);
  if (fileExists) await RNFS.unlink(toFile);
  await RNFS.moveFile(fromUrl, toFile).promise;
}

export const saveFileInDevice = async ({ fileUrl, newName, }) => {
  try {
    const { fileName, type } = fileSetup(fileUrl, newName);

    const basePath = baseStoragePath({ file: fileName, subDir: 'Media' });
    const toFilePath = Platform.OS == 'ios' ? basePath : await androidFileStorePath({ file: fileName, fileType: type, basePath: basePath });

    await moveFileAndStore({ fromUrl: fileUrl, toFile: toFilePath });

    if (Platform.OS === 'android') {
      const { RNMediaScanner } = NativeModules;
      RNMediaScanner && RNMediaScanner.scanFile(toFilePath);
    }

    if (Platform.OS === 'ios') {
      if (type === 'image' || type === 'video') {
        await CameraRoll.save(toFilePath, { type });
      } else {
        RNFetchBlob.ios.previewDocument(toFilePath);
      }
    }

    Alert.alert('Success', 'File saved successfully.');
  } catch (error) {
    console.log('Error saving file:', error);
    Alert.alert('Error', 'Failed save file.');
  }
};