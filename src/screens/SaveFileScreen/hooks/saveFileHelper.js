import RNFS from 'react-native-fs';
import { Alert, NativeModules, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const getFileType = (fileName) => {
  if (!fileName) return 'unknown';

  const extension = fileName.split('.').pop().toLowerCase();

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'heic'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'rtf'];

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  } else if (documentExtensions.includes(extension)) {
    return 'document';
  } else {
    return 'other';
  }
};

export const fileSetup = (file) => {
  const fileName = file.split('/').pop();
  const type = getFileType(fileName);
  return { fileName, type };
}

export const baseStoragePath = ({ file, subDir = 'Media' }) => Platform.OS == 'android' ? `${RNFS.ExternalStorageDirectoryPath}/Android/media/com.rnui/RNUI/${subDir}` : `${RNFS.DocumentDirectoryPath}/${file}`;

export const fileStorePath = async ({ basePath, file, fileType }) => {
  let folderPath;
  if (fileType === 'image') {
    folderPath = `${basePath}/RNUI Images/`;
  } else if (fileType === 'video') {
    folderPath = `${basePath}/RNUI Video/`;
  } else if (fileType === 'document') {
    folderPath = `${basePath}/RNUI Documents/`;
  } else {
    folderPath = `${basePath}/Other/`;
  }

  await RNFS.mkdir(folderPath);

  return `${folderPath}${file}`;
}

export const downloadFileAndStore = async ({ fromUrl, toFile }) => {
  const downloadResult = await RNFS.downloadFile({
    fromUrl: fromUrl,
    toFile: toFile,
    background: true,
    progress: (res) => {
      console.log(`Downloading... ${((res.bytesWritten / res.contentLength) * 100).toFixed(2)}%`);
    },
  }).promise;

  return downloadResult;
}

export const downloadAndSaveFileInDevice = async (fileUrl) => {
  try {
    const { fileName, type } = fileSetup(fileUrl);

    const basePath = baseStoragePath({ file: fileName, subDir: 'Media' });
    const toFilePath = Platform.OS == 'ios' ? basePath : await fileStorePath({ file: fileName, fileType: type, basePath: basePath });

    const downloadResult = await downloadFileAndStore({ fromUrl: fileUrl, toFile: toFilePath });

    if (downloadResult.statusCode === 200) {
      if (Platform.OS === 'android') {
        const { RNMediaScanner } = NativeModules;
        RNMediaScanner && RNMediaScanner.scanFile(toFilePath);
      }
      if (Platform.OS === 'ios' && (type === 'image' || type === 'video')) {
        await CameraRoll.save(toFilePath, { type });
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