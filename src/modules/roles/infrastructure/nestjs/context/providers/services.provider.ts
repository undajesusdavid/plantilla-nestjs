import { TypeormRoleRepository } from '@modules/roles/infrastructure/persistence/typeorm/role.repository';
import { ROLE_REPOSITORY } from '@modules/roles/core/contracts/RoleRepository';

export const ServicesProvider = [
  {
    provide: ROLE_REPOSITORY,
    useClass: TypeormRoleRepository,
  },
];


