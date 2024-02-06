import { database } from './index'; 

import { seedDatabase } from './seedDatabase';

async function checkAndSeedDatabase() {

  const appsCollection = database.collections.get('apps');
  const appsCount = await appsCollection.query().fetchCount();

  console.log(appsCount);

  if (appsCount === 0) {
    await seedDatabase();
    console.log('Database seeded!');
  } else {
    console.log('Database already has records.');
  }
}
export { checkAndSeedDatabase };
