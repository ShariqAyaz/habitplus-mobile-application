import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Navigating to Main screen');
      //navigation.replace('Main');//
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
            <Image source={require('../assets/img/background_splash.jpg')} style={styles.logo} />
            <Text style={styles.title}>
              habit++
            </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
  title:{
    fontFamily: 'Helvetica',
    color: 'black',
    fontSize: 50,
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    position: 'absolute',
    top: '20%',
    opacity: 0.9,
  },
  logo: {
    width: '90%',
    height: '95%',
  },
});

export default Splash;