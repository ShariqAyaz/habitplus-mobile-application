import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { database } from '../../services/database';

const Settings = ({ navigation }) => {
  const [isTokenSaved, setIsTokenSaved] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      setIsTokenSaved(token !== null);
    } catch (error) {
      console.log('Error checking token:', error);
    }
  };

  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsTokenSaved(false);
      console.log('Token deleted');
    } catch (error) {
      console.log('Error deleting token:', error);
    }
  };

  const insertFun = async () => {
    //   async function insertNewApp(title, description, createdAt, updatedAt, author) {
    //     await database.action(async () => {
    //       const appsCollection = database.collections.get('apps');

    //       const newApp = await appsCollection.create(app => {
    //         app.title = title;
    //         app.description = description;
    //         app.created_at = createdAt;
    //         app.updated_at = updatedAt;
    //         app.author = author;
    //       });

    //       console.log('New App ID:', newApp.id);
    //     });
    //   }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Habit++</Text>

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
        <View>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={(insertFun)}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Insert Data</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => {
              console.log('Token saved:', isTokenSaved);
              alert(`isTokenSaved: ${isTokenSaved}`);
            }}
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
            onPress={() => navigation.navigate('GettingStarted')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Template</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 4 }]}
            onPress={() => navigation.navigate('MainScreen')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>GO BACK</Text>
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

export default Settings;
