import { SequelizePermissionRepository } from '../../../persistence/sequelize/permission.repository';
import { SequelizeRoleRepository } from '../../../persistence/sequelize/role.repository';
import { ROLE_REPOSITORY } from 'src/access_control/core/role/RoleRepository';
import { PERMISSION_REPOSITORY } from 'src/access_control/core/permission/PermissionRepository';

export const ServicesProvider = [
    {
        provide: ROLE_REPOSITORY,
        useClass: SequelizeRoleRepository,
    },
    {
        provide: PERMISSION_REPOSITORY,
        useClass: SequelizePermissionRepository,
    }
]


