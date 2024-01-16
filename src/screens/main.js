import React from 'react';
import { View, ImageBackground, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Main = ({ navigation }) => {

  return (
    <ImageBackground source={require('../assets/img/background_splash.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>

        <Text style={styles.heading}>Habit++</Text>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { borderRadius: 4 }]}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={[styles.buttonText, { color: 'white' }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { borderRadius: 4 }]}
              onPress={() => navigation.navigate('HabitPlans')}
            >
              <Text style={[styles.buttonText, { color: 'white' }]}>Registration</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  heading: {
    fontSize: 36,
    fontStyle: 'italic',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowColor: 'black',
    textShadowOffset: { width: -3, height: 4 },
    textShadowRadius: 4,
    marginBottom: 70,
    marginLeft: 80,
    marginRight: 80,
    paddingVertical: '50%',
    borderRadius: 10,
    width: '60%',
    height: '60%',
    textAlign: 'center',
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
    borderRadius: 20, // Rounded corners
    borderWidth: 0,
    borderColor: '#4CAF50',
  },
  buttonText: {
    color: 'white', // White text
    fontSize: 16,
    fontWeight: 'bold', // Bold font weight
    textAlign: 'center',
  },
});

export default Main;
