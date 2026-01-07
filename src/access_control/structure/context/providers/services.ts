import { PermissionRepositoryToken } from '../../../app/contracts/PermissionRepository';
import { PermissionRepositoryImp } from '../../services/PermissionRepositoryImp';
import { RoleRepositoryToken } from '../../../app/contracts/RoleRepository';
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