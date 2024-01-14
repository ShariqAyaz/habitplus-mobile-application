import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import Main from './src/screens/Main';
import Dashboard from './src/screens/Dashboard';
import DashboardOld from './src/screens/DashboardOld';

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
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        ) : (
          <>
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
            <Stack.Screen name="DashboardOld" component={DashboardOld} options={{ headerShown: false }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
