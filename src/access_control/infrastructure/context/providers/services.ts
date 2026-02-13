import { PermissionRepositoryImp } from '../../repositories/sequelize/PermissionRepositoryImp';
import { RoleRepositoryImp } from '../../repositories/sequelize/RoleRepositoryImp';
import { ROLE_REPOSITORY } from 'src/access_control/core/role/RoleRepository';
import { PERMISSION_REPOSITORY } from 'src/access_control/core/permission/PermissionRepository';

export const Services = [
    {
        provide: ROLE_REPOSITORY,
        useClass: RoleRepositoryImp,
    },
    {
        provide: PERMISSION_REPOSITORY,
        useClass: PermissionRepositoryImp,
    }
]


export const ServicesExport = [
    ROLE_REPOSITORY,
    PERMISSION_REPOSITORY
]