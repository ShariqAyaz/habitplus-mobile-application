import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../services/database/index';
import { Q } from '@nozbe/watermelondb';
import PushNotification from 'react-native-push-notification';
import RemoteNotification from '../../RemoteNotification';
import BackupButton from './BackupButton';

const MainX = ({ navigation }) => {
  const [isTokenSaved, setIsTokenSaved] = useState(false);
  const [appsCount, setAppsCount] = useState(0);
  const [appsData, setAppsData] = useState([]);

  const LocalNotification = () => {
    console.log('LocalNotification');
    const key = Date.now().toString(); // Key must be unique everytime
    PushNotification.createChannel(
      {
        channelId: key, // (required)
        channelName: "Local messasge", // (required)
        channelDescription: "Notification for Local message", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.localNotification({
      channelId: key, //this must be same with channelid in createchannel
      title: 'Local Message',
      message: 'Local message !!',
    })
  };

  useEffect(() => {

    const fetchAppsData = async () => {
      const apps = await database.collections.get('apps').query().fetch();

      const appsuui = await database.collections.get('apps_ui').query().fetch();

      const app_activity_data = await database.collections.get('app_activity_data').query().fetch();

      const xx = app_activity_data.map((app_activity_data => app_activity_data));

      console.log('app_activity_data:', xx);

      const appsWithData = await Promise.all(apps.map(async (app) => {
        const appUI = await database.collections.get('apps_ui')
          .query()
          .fetch();
        return {
          ...app._raw,
        };
      }));

      setAppsData(appsWithData);
    };

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsTokenSaved(token !== null);
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
    fetchAppsData();
  }, []);

  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsTokenSaved(false);
      console.log('Token deleted');
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Apps Count: {appsCount}</Text>
      {appsData.map((app, index) => (
        <View key={index} style={styles.appContainer}>
          <Text style={styles.appTitle}>{app.title}</Text>
          <Text>{app.description}</Text>
          {app.apps_ui && app.apps_ui.map((ui, uiIndex) => (
            <Text key={uiIndex}>Theme ID: {ui.theme_id}</Text>
          ))}

        </View>
      ))}

      <Text style={styles.heading}>MainX.js - Habit++</Text>

      <View style={[styles.buttonContainer, { flex: 1, justifyContent: 'flex-end' }]}>
        {!isTokenSaved && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { borderRadius: 4 }]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.buttonText, { color: 'black' }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { borderRadius: 4 }]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={[styles.buttonText, { color: 'black' }]}>Registration</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonRow}>
          <RemoteNotification />

          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('DevConsole')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Developer Console</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 6 }]}
            onPress={LocalNotification}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>TestScreen</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => console.log('Token saved:', isTokenSaved)}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Check Token</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={deleteToken}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Delete Token</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('MapScreen')}
          >
            <Text style={[styles.buttonText, { color: 'black', borderWidth: 2 }]}>CHeckMap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={deleteToken}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Delete Token</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('GettingStarted')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>GettingStarted</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('MainScreen')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>MainScreen</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('ReadingHabit')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Reading Application</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('ReadingHabitMCQs')}>
            <Text style={[styles.buttonText, { color: 'black' }]}>ReadingHabitMCQs</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('infloading')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>infloading</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('MyScreen')}>
            <Text style={[styles.buttonText, { color: 'black' }]}>MyScreen</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('HabitPlans')}>
            <Text style={[styles.buttonText, { color: 'black' }]}>HabitPlans</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontStyle: 'italic',
    color: 'black',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  appContainer: {
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    width: '48%',
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: '#4CAF50',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainX;
