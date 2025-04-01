import RNFS from 'react-native-fs';
import { Alert, NativeModules, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';

const refreshStorage = async ({ toFile, fileType }) => {
  if (Platform.OS === 'android') {
    const { RNMediaScanner } = NativeModules;
    RNMediaScanner && RNMediaScanner.scanFile(toFile);
  }
  if (Platform.OS === 'ios') {
    if (fileType === 'image' || fileType === 'video') {
      await CameraRoll.save(toFile, { type: fileType });
    } else {
      RNFetchBlob.ios.previewDocument(toFile);
    }
  }
}

// From Url / Server to Device
export const downloadAndSaveFileInDevice = async ({ fromUrl, toFile, fileType, progress = () => { } }) => {
  try {

    if (!fromUrl) {
      console.log('Missing : fromUrl required.');
      return;
    } else if (!toFile) {
      console.log('Missing : toFile required.');
      return;
    } else if (!fileType) {
      console.log('Missing : fileType required.');
      return;
    }

    const downloadResult = await RNFS.downloadFile({
      fromUrl: fromUrl,
      toFile: toFile,
      background: true,
      progress: (res) => { progress(((res.bytesWritten / res.contentLength) * 100).toFixed(2)); },
    }).promise;

    if (downloadResult.statusCode === 200) {
      await refreshStorage({ fileType, toFile });
      Alert.alert('Success', 'File downloaded and saved successfully.');
    } else {
      Alert.alert('Failed', 'Download failed with status ' + downloadResult.statusCode);
    }
  } catch (error) {
    console.log('Error saving file:', error);
    Alert.alert('Error', 'Failed to download and save file.');
  }
};

// Copy and Move the file in device
export const manageFileInDevice = async ({ fromUrl, toFile, fileType, copy = false }) => {
  try {

    if (!fromUrl) {
      console.log('Missing : fromUrl required.');
      return;
    } else if (!toFile) {
      console.log('Missing : toFile required.');
      return;
    } else if (!fileType) {
      console.log('Missing : fileType required.');
      return;
    }

    const fileExists = await RNFS.exists(toFile);
    if (fileExists) await RNFS.unlink(toFile);

    if (copy == true) await RNFS.copyFile(fromUrl, toFile).promise;
    else await RNFS.moveFile(fromUrl, toFile).promise;

    await refreshStorage({ fileType, toFile });

    Alert.alert('Success', 'File saved successfully.');
  } catch (error) {
    console.log('Error saving file:', error);
    Alert.alert('Error', 'Failed save file.');
  }
};