import { SequelizeRoleRepository } from '../../../persistence/sequelize/role.repository';
import { ROLE_REPOSITORY } from 'src/roles/core/RoleRepository';


export const ServicesProvider = [
    {
        provide: ROLE_REPOSITORY,
        useClass: SequelizeRoleRepository,
    }
]


