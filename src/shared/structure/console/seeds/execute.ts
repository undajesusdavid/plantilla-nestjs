import { BuildSeeders } from './BuildSeeder';

//Seeders
import { seedAccessControlToken } from 'src/access_control/structure/seeders/seedAccessControl';
import { SeedUsersToken } from 'src/users/structure/seeders/seedUsers';

const seeders = new BuildSeeders([
    seedAccessControlToken.toString(),
    SeedUsersToken.toString()
]);

seeders.execute()
    .then(() => console.log('Seeding completed!'))
    .catch((error) => console.error('Seeding failed:', error));