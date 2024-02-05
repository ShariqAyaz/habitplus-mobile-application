import { database } from './index'; // Adjust path as necessary

import { seedDatabase } from './seedDatabase';

async function checkAndSeedDatabase() {

  const appsCollection = database.collections.get('apps');
  const appsCount = await appsCollection.query().fetchCount();

  console.log(appsCount);

  if (appsCount === 0) {
    // No records found, proceed with seeding
    await seedDatabase();
    console.log('Database seeded!');
  } else {
    // Records exist, no need to seed
    console.log('Database already has records.');
  }
}
export { checkAndSeedDatabase };
