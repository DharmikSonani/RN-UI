import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
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


export const saveFileToMedia = async (fileUrl) => {
  try {

    const fileName = fileUrl.split('/').pop();
    const type = getFileType(fileName);
    const baseMediaPath = `${RNFS.ExternalStorageDirectoryPath}/Android/media/com.rnui/RNUI/Media`;

    let folderPath;
    if (type === 'image') {
      folderPath = `${baseMediaPath}/RNUI Images/`;
    } else if (type === 'video') {
      folderPath = `${baseMediaPath}/RNUI Video/`;
    } else if (type === 'document') {
      folderPath = `${baseMediaPath}/RNUI Documents/`;
    } else {
      folderPath = `${baseMediaPath}/Other/`;
    }

    // Ensure directory exists
    await RNFS.mkdir(folderPath);

    const destPath = `${folderPath}${fileName}`;

    // Download the file from URL
    const downloadOptions = {
      fromUrl: fileUrl,
      toFile: destPath,
      background: true,
      progress: (res) => {
        console.log(`Downloading... ${((res.bytesWritten / res.contentLength) * 100).toFixed(2)}%`);
      },
    };

    const downloadResult = await RNFS.downloadFile(downloadOptions).promise;

    if (downloadResult.statusCode === 200) {
      Alert.alert('Success', 'File downloaded and saved successfully.');
    } else {
      Alert.alert('Failed', 'Download failed with status ' + downloadResult.statusCode);
    }
  } catch (error) {
    console.log('Error saving file:', error);
    Alert.alert('Error', 'Failed to download and save file.');
  }
};


export const saveFileToiOS = async (fileUrl) => {
  try {

    const fileName = fileUrl.split('/').pop();
    const type = getFileType(fileName);
    const iOSPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    // Download the file
    const downloadResult = await RNFS.downloadFile({
      fromUrl: fileUrl,
      toFile: iOSPath,
      background: true,
      progress: (res) => {
        console.log(`Downloading... ${((res.bytesWritten / res.contentLength) * 100).toFixed(2)}%`);
      },
    }).promise;

    if (downloadResult.statusCode === 200) {
      // Save images & videos to Photos app
      if (type === 'image' || type === 'video') {
        await CameraRoll.save(iOSPath, { type });
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