import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './services/database/index';


import SplashScreen from './src/screens/SplashScreen';
import Register from './src/screens/Register';
import GettingStarted from './src/screens/GettingStarted';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';
import MainX from './src/screens/MainX';
import MainScreen from './src/screens/MainScreen';
import MarketPlace from './src/screens/MarketPlace';
import Settings from './src/screens/Settings';
import Profile from './src/screens/Profile';
import infloading from './src/screens/infloading';
import MyScreen from './src/screens/MyScreen';
import MapScreen from './src/screens/MapScreen';
import DevConsole from './src/screens/DevConsole';

const Stack = createStackNavigator(); 


const App = () => {
  const [isSplash, setIsSplash] = useState(true); 
  const [initialRoute, setInitialRoute] = useState('Welcome'); 

  useEffect(() => {
    
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setInitialRoute('MainX'); 
          // setInitialRoute('infloading'); 
        } else {
          setInitialRoute('Welcome'); 
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSplash(false); 
      }
    };

    checkLoginStatus();
  }, []);

  if (isSplash) {
    return <SplashScreen />; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="MainX" component={MainX} options={{ headerShown: false }} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GettingStarted" component={GettingStarted} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="MarketPlace" component={MarketPlace} options={{ headerShown: false }} />
        <Stack.Screen name="infloading" component={infloading} options={{ headerShown: false }} />
        <Stack.Screen name="MyScreen" component={MyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DevConsole" component={DevConsole} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
