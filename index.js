import { AppRegistry } from 'react-native';
import App from './App'; 
import { name as appName } from './app.json';
import { seedDatabase, deleteAllRecords } from './services/database/seedDatabase'; 

const WrappedApp = () => {
  
  seedDatabase().then(() => {
    console.log('Database check and seed complete!');
  }).catch((error) => {
    console.error('Error during database check/seeding:', error);
  });

  // Call the function to delete all records  
  // deleteAllRecords().then(() => {
  //   console.log('Deletion completed successfully.');
  // }).catch((error) => {
  //   console.error('Error during deletion:', error);
  // });

  return <App />;
};

AppRegistry.registerComponent(appName, () => WrappedApp);
