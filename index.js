import { AppRegistry } from 'react-native';
import SplashScreen from './src/screens/splash';
import MainScreen from './src/screens/main';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => SplashScreen);
AppRegistry.registerComponent('Main', () => MainScreen);
