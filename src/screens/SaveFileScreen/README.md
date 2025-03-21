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

### 2. [`saveFileHelper.js`](https://github.com/DharmikSonani/RN-UI/blob/main/src/screens/SaveFileScreen/hooks/saveFileHelper.js)

```javascript
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
```

---

## Usage

```javascript
import { useFilePermissions } from "./hooks/useFilePermissions";
import { downloadAndSaveFileInDevice } from "./hooks/saveFileHelper";

const { requestFilePermission } = useFilePermissions();

const saveFile = async (url) => {
    const hasPermission = await requestFilePermission();
    if (!hasPermission) {
        console.log('Permission Denied', 'Enable storage access to save files.');
        return;
    }
    await downloadAndSaveFileInDevice({ fileUrl: url, progress: (per)=>{console.log(per)} });
};
```