import { AppRegistry } from 'react-native';
import SplashScreen from './src/screens/Splash';
import MainScreen from './src/screens/Main';
import DashboardScreen from './src/screens/Dashboard';
import HabitPlansScreen from './src/screens/HabitPlans';
import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => DashboardScreen);
// AppRegistry.registerComponent(appName, () => SplashScreen);
 AppRegistry.registerComponent(appName, () => HabitPlansScreen);
