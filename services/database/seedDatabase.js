import { database } from './index';

async function seedDatabase() {

  const appsdata = await database.collections.get('apps').query().fetchCount();
  const apps_uidata = await database.collections.get('apps_ui').query().fetchCount();

  console.log(appsdata, 'apps seedDatabase');
  console.log(apps_uidata, 'apps_ui seedDatabase');

    if (appsdata === 0 || apps_uidata === 0 ) {

      console.log('Seeding new data...');
// const apps = [
//   {
//     _id : '1',
//     title : 'Keeper',
//     description : "Keep is the best for keeping your notes, lists, photos, and audio organized. You can add, edit, or delete notes, lists, photos, and audio. You can also add reminders to your notes.",
//     created_at : Date.now(),
//     updated_at : Date.now(),
//     author : 'Ali'
//   },]

      const apps = [
        {
          _id: '1',
          title: 'RUNNER',
          appid: '101',
          description: "Runner is officially app under 'Habit++' ecosystem. It schedules your runs and it uses GPS to track your runs and provide you with the stats.",
          created_at: Date.now(),
          updated_at: Date.now(),
          author: 'Shariq',
          apps_ui: {
            theme_id: 3
          }
        },
        {
          _id: '2',
          title: 'READING',
          appid: '102',
          description: "Introducing Claudiu's revolutionary scheduling app: A user-friendly solution to manage your time effectively. With intelligent scheduling, task tracking, and analytics, this app simplifies your daily routines. Say goodbye to missed appointments and stress. Download today for a more organized and fulfilling life.",
          created_at: Date.now(),
          updated_at: Date.now(),
          author: 'Claudiu',
          apps_ui: {
            theme_id: 2
          }
        },
        {
          _id: '3',
          title: 'SMART CALENDAR',
          appid: '103',
          description: "Configure your app settings here.",
          created_at: Date.now(),
          updated_at: Date.now(),
          author: 'David',
          apps_ui: {
            theme_id: 1
          }
        }
      ];

      await database.write(async () => {
        for (const app of apps) {
          
          const newApp = await database.collections.get('apps').create((appRecord) => {
            appRecord.title = app.title;
            appRecord.description = app.description;
            appRecord.created_at = app.created_at;
            appRecord.updated_at = app.updated_at;
            appRecord.author = app.author;
          });

          console.log( newApp.id, 'newApp.id');
      
          const newApp_ui = await database.collections.get('apps_ui').create((appsUI) => {
            appsUI.app_id = newApp.id; 
            appsUI.theme_id = 1;
          });
        }
      });

      const countt = await database.collections.get('apps').query().fetchCount();
      console.log(countt , 'seedDatabase hasData');
    }
    else {
      const appsdata = await database.collections.get('apps').query();
      console.log(appsdata, 'appsdata seedDatabase');
    }
}

async function deleteAllRecords() {
  await database.write(async () => {
    
    const allApps = await database.collections.get('apps').query().fetch();
    
    await Promise.all(allApps.map(app => app.destroyPermanently()));
    
    const allAppsUI = await database.collections.get('apps_ui').query().fetch();
    
    await Promise.all(allAppsUI.map(appUI => appUI.destroyPermanently()));

  });

  console.log('All records from both tables have been deleted.');
}

export { seedDatabase, deleteAllRecords };