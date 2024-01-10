import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import BackgroundImage from '../assets/img/background_splash.jpg';

const Dashboard = () => {
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth - 40) / 2;

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>

    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.mainContent}>
        <Text style={styles.headerText}>Welcome to Habit++</Text>
      </View>

      {/* Main Content */}
      <View style={styles.header}>
      <Text style={styles.screenText}>Dashboard</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Habit Plans</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Daily Score</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Habit Tracker</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Smart Reminders</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Learning Modules</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Community Challenges</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Quotes and Success Stories</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Gamification Elements</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.navigationButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Mood & Habit Analysis</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingsButton, { width: buttonWidth }]}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginTop: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  navigationButton: {
    backgroundColor: '#FFFFFF',
    width: '50%', 
    aspectRatio: 1, 
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
