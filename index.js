import { AppRegistry } from 'react-native';
import App from './App'; 
import { name as appName } from './app.json';
import { checkAndSeedDatabase } from './services/database/checkAndSeedDatabase';

const WrappedApp = () => {
  checkAndSeedDatabase().then(() => {
    console.log('Database check and seed complete!');
  }).catch((error) => {
    console.error('Error during database check/seeding:', error);
  });

  return <App />;
};

AppRegistry.registerComponent(appName, () => WrappedApp);
