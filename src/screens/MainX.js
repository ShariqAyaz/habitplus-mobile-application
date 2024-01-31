import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainX = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
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
          onPress={() => navigation.navigate('infloading')}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>infloading</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderRadius: 4 }]}
          onPress={() => navigation.navigate('MyScreen')}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>MyScreen</Text>
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

export default MainX;
