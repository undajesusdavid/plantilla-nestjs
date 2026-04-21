import { TypeormPermissionRepository } from '@modules/permissions/infrastructure/persistence/typeorm/permission.repository';
import { PERMISSION_REPOSITORY } from '@modules/permissions/core/contracts/PermissionRepository';

export const ServicesProvider = [
  {
    provide: PERMISSION_REPOSITORY,
    useClass: TypeormPermissionRepository,
  },
];


