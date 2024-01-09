import {AppRegistry} from 'react-native';
import SplashScreen from './src/screens/splash';
import MainScreen from './src/screens/main';
import {name as appName} from './app.json';
import App from './App';

AppRegistry.registerComponent(appName,()=>SplashScreen);
