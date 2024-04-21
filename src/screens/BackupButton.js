import React from 'react';
import { View,Text, Button, PermissionsAndroid } from 'react-native';

const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message: "This app needs access to your storage to save backups",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        return (granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
        console.warn(err);
        return false;
    }
}

const BackupButton = () => {
    const createDatabaseBackup = async () => {
        const hasPermission = await requestStoragePermission();
        if (hasPermission) {
            NativeModules.DatabaseBackup.createBackup(
                (successMessage) => {
                    console.log(successMessage);
                },
                (errorMessage) => {
                    console.error(errorMessage);
                }
            );
        } else {
            console.log('Storage Permission Denied');
        }
    };

    return (
        <View>
            <Text>
            <Button title="Backup Database" onPress={createDatabaseBackup} />
            </Text>
        </View>
    );
};

export default BackupButton;
