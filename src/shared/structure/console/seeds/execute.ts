import { BuildSeeders } from './BuildSeeder';

const seeders = new BuildSeeders([
    "seedAccessControl",
    "seedUsers"
]);

seeders.execute()
    .then(() => console.log('Seeding completed!'))
    .catch((error) => console.error('Seeding failed:', error));