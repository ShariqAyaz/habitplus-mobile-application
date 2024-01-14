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
              style={styles.button}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              
              onPress={() => navigation.navigate('DashboardOld')}
            >
              <Text style={styles.buttonText}>Registration</Text>
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
    textShadowRadius: 5,
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
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Main;
