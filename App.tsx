import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';


const Stack = createStackNavigator();

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSplash ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        ) : (
          <>
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
