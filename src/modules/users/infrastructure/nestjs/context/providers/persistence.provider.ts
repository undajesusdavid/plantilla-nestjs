import { USER_REPOSITORY } from '@src/modules/users/core/contracts/UserRepository';
import { TypeormUserRepository } from '../../../persistence/typeorm/user.repository';
import { TypeormUserMapper } from '@modules/users/infrastructure/persistence/typeorm/user.mapper';

export const PersistenceProvider = [
    {
        provide: USER_REPOSITORY,
        useClass: TypeormUserRepository,
    },
    {
        provide: TypeormUserMapper,
        useClass: TypeormUserMapper,
    },
    
];


