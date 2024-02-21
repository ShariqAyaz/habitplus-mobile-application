import { database } from './index';

async function seedDatabase() {

  const appsdata = await database.collections.get('apps').query().fetchCount();

  console.log(appsdata, 'apps seedDatabase');

  if (appsdata === 0) {

    console.log('Seeding new data...');

    const apps = [
      {
        title: 'RUNNER',
        appid: '101',
        description: "Runner is officially app under 'Habit++' ecosystem. It schedules your runs and it uses GPS to track your runs and provide you with the stats.",
        created_at: Date.now(),
        updated_at: Date.now(),
        author: 'Shariq',
        image_url: '/assets/images/noimg.png',
        profile_url: '/assets/images/noimg.png',
        apps_ui: {
          theme_id: 3
        }
      },
      {
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
        title: 'SMART CALENDAR',
        appid: '103',
        description: "Configure your app settings here.",
        created_at: Date.now(),
        updated_at: Date.now(),
        author: 'David',
        apps_ui: {
          theme_id: 1
        }
      },
      {
        title: 'MINDFULNESS',
        appid: '104',
        description: "Mindfulness is the best for keeping your notes, lists, photos, and audio organized. You can add, edit, or delete notes, lists, photos, and audio. You can also add reminders to your notes.",
        created_at: Date.now(),
        updated_at: Date.now(),
        author: 'Shariq',
        apps_ui: {
          theme_id: 1
        }
      }
    ];

    await database.write(async () => {

      for (const app of apps) {
        const newApp = await database.collections.get('apps').create((appRecord) => {
          appRecord.title = app.title;
          appRecord.appid = app.appid;
          appRecord.description = app.description;
          appRecord.created_at = app.created_at;
          appRecord.updated_at = app.updated_at;
          appRecord.author = app.author;
        });

        console.log(newApp.userid, 'newApp.userid');

        const newApp_ui = await database.collections.get('apps_ui').create((appsUI) => {
          appsUI.app_id = newApp.userid;
          appsUI.theme_id = 1;
        });
      }
    });

    const countt = await database.collections.get('apps').query().fetchCount();
    console.log(countt, 'seedDatabase hasData');

  }
  else {
    const appsdata = await database.collections.get('apps').query();
    console.log(appsdata, 'appsdata seedDatabase');
  }

  const app_activityCount = await database.collections.get('app_activity').query().fetchCount();

  if (app_activityCount === 0) {

    console.log('Seeding running activity and achievements...');

    await database.write(async () => {
      const runningActivity = await database.collections.get('app_activity').create((activity) => {
        activity.activityid = '1';
        activity.appid = '101';
        activity.userid = '1';
        activity.title = 'Morning Runs';
        activity.description = 'Daily morning runs to keep fit';
        activity.type = 'DAILY';
        activity.time = '07:00';
        activity.frequency = 1;
        activity.start_date = new Date().getTime();

        activity.notify = true;
        activity.created_at = new Date().getTime();
      });

      const runAchievements = [
        { 
          distance: '5km', 
          duration: '30min', 
          date: '2022-01-01',
        },
        { 
          distance: '6km', 
          duration: '35min', 
          date: '2022-01-02',
        },
        { 
          distance: '2km', 
          duration: '15min', 
          date: '2022-01-03',
          coordinates: [
            { latitude: 37.78825, longitude: -122.4324, timestamp: '2022-01-03T07:00:00Z' },
            { latitude: 37.78836, longitude: -122.4325, timestamp: '2022-01-03T07:15:00Z' },
            { latitude: 37.78838, longitude: -122.4325, timestamp: '2022-01-03T07:55:00Z' },
          ],
        }
      ];
      

      for (const achievement of runAchievements) {
        await database.collections.get('app_activity_data').create(data => {
          data.activityidfk = runningActivity.id; 
          data.activityid = runningActivity.activityid; 
          data.dataobj = JSON.stringify({
            distance: achievement.distance,
            duration: achievement.duration,
            date: achievement.date,
            coordinates: achievement.coordinates
          });
        });
      }
    });

    console.log('Seeded running activity and achievements.\n')
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














