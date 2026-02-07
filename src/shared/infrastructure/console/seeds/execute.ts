import { BuildSeeders } from './BuildSeeder';

//Seeders
import { seedAccessControlToken } from 'src/access_control/infrastructure/seeders/seedAccessControl';
import { SeedUsersToken } from 'src/users/infrastructure/seeders/seedUsers';

const seeders = new BuildSeeders([
    seedAccessControlToken,
    SeedUsersToken
]);

seeders.execute()
    .then(() => console.log('Seeding completed!'))
    .catch((error) => console.error('Seeding failed:', error));