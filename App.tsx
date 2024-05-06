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
import MapScreen from './src/screens/MapScreen';
import DevConsole from './src/screens/DevConsole';
import LoginTest from './src/screens/LoginTest';
import ReadingHabit from './src/screens/ReadingHabit';
import ReadingHabitMCQs from './src/screens/ReadingHabitMCQs';
import HabitPlans from './src/screens/HabitPlans';
import Menu from './src/screens/Menu';

import PushNotification from 'react-native-push-notification';

const Stack = createStackNavigator();

const App = () => {
  const [isSplash, setIsSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Welcome');

  let bool = true;
  const LocalNotification = () => {
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

if (bool===true) {
    LocalNotification();
    bool = !bool;
    console.log('Local Notification');
    
}

  useEffect(() => {

    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setInitialRoute('Menu');
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
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DevConsole" component={DevConsole} options={{ headerShown: false }} />
        <Stack.Screen name="LoginTest" component={LoginTest} options={{ headerShown: false }} />
        <Stack.Screen name="ReadingHabit" component={ReadingHabit} options={{ headerShown: false }} />
        <Stack.Screen name="ReadingHabitMCQs" component={ReadingHabitMCQs} options={{ headerShown: false }} />
        <Stack.Screen name="HabitPlans" component={HabitPlans} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
