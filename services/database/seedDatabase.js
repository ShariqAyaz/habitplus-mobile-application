import { database } from './index'; 

async function seedDatabase() {
  const hasData = await database.collections.get('apps').query().fetchCount();
  if (hasData === 0) {
    console.log("\n\nNO DATA found\n\n");
  }
}

export { seedDatabase};
