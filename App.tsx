import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SplashScreen from './src/screens/SplashScreen';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';
import Main from './src/screens/Main';

const Stack = createStackNavigator();

const App = () => {
  const [isSplash, setIsSplash] = useState(true); 
  const [initialRoute, setInitialRoute] = useState('Welcome'); 

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setInitialRoute('Main'); 
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
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
