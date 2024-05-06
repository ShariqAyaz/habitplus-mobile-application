import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../services/database/index';
import { Q } from '@nozbe/watermelondb';
import PushNotification from 'react-native-push-notification';
import RemoteNotification from '../../RemoteNotification';
import BackupButton from './BackupButton';

const Menu = ({ navigation }) => {

  const [isTokenSaved, setIsTokenSaved] = useState(false);
  const [appsCount, setAppsCount] = useState(0);
  const [appsData, setAppsData] = useState([]);


  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Temporary Menu</Text>

      <View style={[styles.buttonContainer, { flex: 1, justifyContent: 'flex-end' }]}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('MenuX')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Raw Works</Text>
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

export default Menu;
