// for camera,etc permissions
// in case of prmssns we cant rely on sometimes so we modify android manifest and toast is popup
// infinite loop if user doesnt grant permissions

import { PermissionsAndroid, ToastAndroid } from "react-native";

export const  requestPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        console.log(granted);

        if (
            granted["PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE"] === "denied" ||
            granted["PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE"] === "denied"
        ) {
            ToastAndroid.show("We cannot proceed without permissions", ToastAndroid.LONG)
            requestPermission()
        }
        
    } catch (error) {
        console.log(error);
        
    }
}