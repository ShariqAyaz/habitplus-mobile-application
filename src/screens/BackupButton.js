import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { database } from '../../services/database/index';

import { PermissionsAndroid } from 'react-native';
async function requestStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission Required",
                message: "This app needs access to your storage to save and share backup files",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

const BackupButton = () => {
  const exportAndSaveDatabase = async () => {
    const data = await exportDatabaseData();
    console.log(data);  // Log all data to the console
    const filePath = await saveDataToFile(data);
    if (filePath) {
      Alert.alert("Backup Successful", `Data exported to ${filePath}`);
      shareBackup(filePath);
    } else {
      Alert.alert("Backup Failed", "Failed to export data.");
    }
  };

  const exportDatabaseData = async () => {
    const tables = ['apps', 'components', 'apps_ui', 'apps_comps', 'app_activity', 'app_activity_data', 'users', 'locations'];
    const data = {};
    for (const tableName of tables) {
      const collection = await database.collections.get(tableName).query().fetch();
      data[tableName] = collection.map(item => item._raw);
    }
    return JSON.stringify(data, null, 2);
  };

  const saveDataToFile = async (data) => {
    if (!await requestStoragePermission()) {
        return null;
    }
    const path = RNFS.DownloadDirectoryPath + '/databaseBackup.json';
    try {
      await RNFS.writeFile(path, data, 'utf8');
      return path;
    } catch (error) {
      console.error('Failed to write file:', error);
      return null;
    }
  };

  const shareBackup = async (filePath) => {
    try {
      const shareResponse = await Share.open({
        title: 'Share Database Backup',
        url: 'file://' + filePath,
        type: 'application/json'
      });
      console.log('Share was successful:', shareResponse);
    } catch (error) {
      console.error('Error sharing the file:', error.message);
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
      }}
      onPress={exportAndSaveDatabase}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Backup Data</Text>
    </TouchableOpacity>
  );
};

export default BackupButton;
