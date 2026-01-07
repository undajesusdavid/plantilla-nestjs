import { PermissionRepositoryToken } from '../../../core/contracts/PermissionRepository';
import { PermissionRepositoryImp } from '../../services/PermissionRepositoryImp';
import { RoleRepositoryToken } from '../../../core/contracts/RoleRepository';
import { RoleRepositoryImp } from '../../services/RoleRepositoryImp';

export const Services = [
    {
        provide: PermissionRepositoryToken,
        useClass: PermissionRepositoryImp
    },
    {
        provide: RoleRepositoryToken,
        useClass: RoleRepositoryImp
    }
]


export const ServicesExport = [

]