import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';


import BackgroundImage from '../assets/img/background_splash.jpg';

import Icon from 'react-native-vector-icons/FontAwesome'; 

const Dashboard = () => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    fetch('https://ao40g8brw2.execute-api.us-east-1.amazonaws.com/Production')
      .then((response) => response.json())
      .then((data) => {
        if (data.body && Array.isArray(data.body.apps)) {
          const buttonNames = data.body.apps;
          setButtons(buttonNames);
        } else console.error('Invalid response format:', data);
      })
      .catch((error) => {
        console.error('Error fetching button names:', error);
      });
  }, []);

  const screenWidth = Dimensions.get('window').width;
  
  const buttonWidth = (screenWidth - 40) / 1;

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.mainContent}>
          <Text style={styles.headerText}>Welcome to Habit++</Text>
        </View>
        
        <View style={styles.header}>
          <Text style={styles.screenText}>Dashboard</Text>
        </View>
        
        <View style={styles.navigationContainer}>
          {buttons.map((buttonName, index) => (
            <View style={styles.row} key={index}>
              <TouchableOpacity
                key={index}
                style={[styles.navigationButton, { width: buttonWidth }]}
                onPress={() => {
                  console.log(`pressed. Key is ${index} -> Button "${buttonName}"`);
                }}
              >
                <View style={styles.buttonContent}>
                  {/* Icons */}
                  {/* <Icon name="industry" size={20} color="black" /> */}
                  <Text style={styles.buttonText}>{buttonName}</Text>

                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 10,
    opacity: 0.9
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'green',
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 14,
    width: '100%',
  },
  headerText: {
    fontSize: 28,
    fontStyle: 'italic',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowColor: 'black',
    textShadowOffset: { width: -3, height: 4 },
    textShadowRadius: 6,
    paddingHorizontal: 16,
    borderRadius: 0,
    width: '100%',
    textAlign: 'left',
  },
  screenText: {
    fontSize: 26,
    color: 'black',
  },
  mainContent: {
    margin: 0,
    padding: 0,
    margin: 0,
    fontStyle: 'italic',
  },
  navigationContainer: {
    margin: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  navigationButton: {
    backgroundColor: '#FFFFFF',
    width: '50%',
    //aspectRatio: 1, 
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    backgroundColor: '#FFFFFF',
    width: '50%',
    aspectRatio: 1,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'auto',
  },
});

export default Dashboard;
