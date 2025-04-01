# Download and Store File on Device in React Native

This guide explains how to download and store files on a device in a React Native application, supporting both Android and iOS platforms.

## Required Dependencies
Install the necessary dependencies:

1. [react-native-permissions](https://www.npmjs.com/package/react-native-permissions)
2. [react-native-fs](https://www.npmjs.com/package/react-native-fs)
3. [rn-fetch-blob](https://www.npmjs.com/package/rn-fetch-blob) (Setup only for iOS)
4. [@react-native-camera-roll/camera-roll](https://www.npmjs.com/package/@react-native-camera-roll/camera-roll) (Setup only for iOS)

**Note:** Follow the dependency setup instructions and complete the required native setup before proceeding.

---

## Android Setup

### 1. Modify `AndroidManifest.xml`

Add the following permissions inside `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <!-- Android 13 or Above -->
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO"/>
    <uses-permission android:name="android.permission.READ_MEDIA_AUDIO"/>

    <application
        android:usesCleartextTraffic="true"
        android:requestLegacyExternalStorage="true">
    </application>
</manifest>
```

### 2. Modify `MainApplication.kt`

Add `RNMediaScannerPackage()` to the package list in `android/app/src/main/java/com/rnui/MainApplication.kt`:

```kotlin
class MainApplication : Application(), ReactApplication {
    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    add(RNMediaScannerPackage()) // Required to save media and display it in the gallery
                }
        }
}
```

### 3. Create `RNMediaScannerPackage.kt` (Required)

Create [`android/app/src/main/java/com/rnui/RNMediaScannerPackage.kt`](https://github.com/DharmikSonani/RN-UI/blob/main/android/app/src/main/java/com/rnui/RNMediaScannerPackage.kt):

```kotlin
package com.rnui // Your Application Package Name As Per MainApplication.kt

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RNMediaScannerPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(RNMediaScanner(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
```

### 4. Create `RNMediaScanner.kt` (Required)

Create [`android/app/src/main/java/com/rnui/RNMediaScanner.kt`](https://github.com/DharmikSonani/RN-UI/blob/main/android/app/src/main/java/com/rnui/RNMediaScanner.kt):

```kotlin
package com.rnui // Your Application Package Name As Per MainApplication.kt

import android.media.MediaScannerConnection
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class RNMediaScanner(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "RNMediaScanner"
    }

    @ReactMethod
    fun scanFile(path: String, promise: Promise) {
        try {
            MediaScannerConnection.scanFile(
                reactApplicationContext,
                arrayOf(path),
                null
            ) { scannedPath, _ -> Log.d("MediaScanner", "File scanned: $scannedPath") }

            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERROR_SCANNING", e)
        }
    }
}
```

---

## iOS Setup

### 1. Modify `Info.plist`

Add the following permissions to `ios/RNUI/Info.plist`:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to save media.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>We need access to save images to your gallery.</string>
```

### 2. Modify `Podfile`

Update `ios/Podfile`:

```ruby
setup_permissions([
  'PhotoLibrary',
  'PhotoLibraryAddOnly',
])

pod 'RNFS', :path => '../node_modules/react-native-fs'
pod 'rn-fetch-blob', :path => '../node_modules/rn-fetch-blob'
```

---

## Helper Hooks

### 1. [`useFilePermissions.js`](https://github.com/DharmikSonani/RN-UI/blob/main/src/screens/SaveFileScreen/hooks/useFilePermissions.js)

```javascript
import { Platform, PermissionsAndroid } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const useFilePermissions = () => {
    const checkPermission = async (type) => {
        const status = await check(type);
        return status === RESULTS.GRANTED;
    };

    const requestFilePermission = async () => {
        let granted = false;
        if (Platform.OS === "android") {
            const androidPermissions = Platform.Version >= 33 ? // Android 13 or Above
                [
                    PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                    PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
                    PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
                ] : [
                    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
                ];
            const results = await PermissionsAndroid.requestMultiple(androidPermissions);
            granted = Object.values(results).every(result => result === PermissionsAndroid.RESULTS.GRANTED);
        } else {
            granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY) === RESULTS.GRANTED;
        }
        return granted;
    };

    return { checkPermission, requestFilePermission };
};
```

### 2. [`fileUtils.js`](https://github.com/DharmikSonani/RN-UI/blob/main/src/screens/SaveFileScreen/hooks/fileUtils.js)

```javascript
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

export const fileSetup = (fileUrl = '', newName) => {
    const file = fileUrl?.split('/')?.pop()?.split('?')?.[0]?.replaceAll('%20', ' ')?.split('%2F')?.pop()?.split('.');
    const fileName = newName ? `${newName}.${file[1]}` : `${file[0]}.${file[1]}`;
    const type = getFileType(file?.pop());
    return { fileName, type };
}
```


### 3. [`fileManager.js`](https://github.com/DharmikSonani/RN-UI/blob/main/src/screens/SaveFileScreen/hooks/fileManager.js)

```javascript
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
```

### 4. [`useStorageDirectories.js`](https://github.com/DharmikSonani/RN-UI/blob/main/src/screens/SaveFileScreen/hooks/useStorageDirectories.js)

```javascript
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { fileSetup } from './fileUtils';

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

    const storagePath = Platform.OS == 'android' ? `${RNFS.ExternalStorageDirectoryPath}${mainDirectory}` : `${RNFS.DocumentDirectoryPath}/`;

    return storagePath;
}

export const getFileStorePath = async ({ basePath, file, fileType, subDir }) => {
    let folderPath = basePath;

    if (Platform.OS == 'android') {
        if (basePath?.includes('/Android/media/') || basePath?.includes('/Android/data/')) {
            if (fileType === 'image') {
                folderPath += `${appName} Images/`;
            } else if (fileType === 'video') {
                folderPath += `${appName} Video/`;
            } else if (fileType === 'document') {
                folderPath += `${appName} Documents/`;
            } else {
                folderPath += `Other/`;
            }
        }
    }

    if (subDir && subDir?.trim()) folderPath += `${subDir}/`;

    await RNFS.mkdir(folderPath);

    return `${folderPath}${file}`;
}

const fileStorage = async ({ url, subDir, newName, storagePath }) => {
    const { fileName, type } = fileSetup(url, newName);

    const toFilePath = await getFileStorePath({ basePath: storagePath, file: fileName, fileType: type, subDir: subDir })

    return {
        toFilePath: toFilePath,
        fileType: type,
    }
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

export const useStorageDirectories = ({
    mainDir = '/Android/media/appPackage/appName/'
}) => {
    const storagePath = getStorageBasePath({ mainDir });

    const fileStorageInfo = async ({ url, subDir, newName }) => await fileStorage({ url, subDir, newName, storagePath });

    return { storagePath, getFileStorePath, getStorageBasePath, fileStorageInfo }
}

export const useAndroidMediaDirectory = () => useStorageDirectories({ mainDir: '/Android/media/appPackage/appName/' });
export const useAndroidDataDirectory = () => useStorageDirectories({ mainDir: '/Android/data/appPackage/appName/' });
export const useDCIMDirectory = () => useStorageDirectories({ mainDir: '/DCIM/appName/' });
export const useDocumentsDirectory = () => useStorageDirectories({ mainDir: '/Documents/appName/' });
export const useDownloadDirectory = () => useStorageDirectories({ mainDir: '/Download/appName/' });
export const useMoviesDirectory = () => useStorageDirectories({ mainDir: '/Movies/appName/' });
export const useMusicDirectory = () => useStorageDirectories({ mainDir: '/Music/appName/' });
export const useNotificationsDirectory = () => useStorageDirectories({ mainDir: '/Notifications/appName/' });
export const usePicturesDirectory = () => useStorageDirectories({ mainDir: '/Pictures/appName/' });
export const usePodcastsDirectory = () => useStorageDirectories({ mainDir: '/Podcasts/appName/' });
export const useRecordingsDirectory = () => useStorageDirectories({ mainDir: '/Recordings/appName/' });
export const useRingtonesDirectory = () => useStorageDirectories({ mainDir: '/Ringtones/appName/' });
```

---

## Usage
- [Usage Reference](https://github.com/DharmikSonani/RN-UI/blob/main/src/screens/SaveFileScreen/SaveFileScreen.Hook.js)
```javascript
import { useFilePermissions } from "./hooks/useFilePermissions";
import { downloadAndSaveFileInDevice } from "./hooks/fileManager";
import { useDownloadDirectory } from "./hooks/useStorageDirectories";

const { requestFilePermission } = useFilePermissions();
const { fileStorageInfo } = useDownloadDirectory();

const saveFile = async (url) => {
    if (!url) return;
    
    const hasPermission = await requestFilePermission();

    if (!hasPermission) {
        console.log('Permission Denied', 'Enable storage access to save files.');
        return;
    }

    const { fileType, toFilePath } = await fileStorageInfo({ url: url }); // Required for storing a file

    await downloadAndSaveFileInDevice({
        fromUrl: url,
        toFile: toFilePath,
        fileType: fileType,
        progress: console.log
    });
};
```