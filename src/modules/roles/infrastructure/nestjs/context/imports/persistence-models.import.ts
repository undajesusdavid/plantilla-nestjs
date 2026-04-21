import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormRoleModel } from '@modules/roles/infrastructure/persistence/typeorm/role.model';
import { TypeormPermissionModel } from '@modules/permissions/infrastructure/persistence/typeorm/permission.model';

const TypeormModels = TypeOrmModule.forFeature([
  TypeormRoleModel,
  TypeormPermissionModel,
]);

export const PersistenceModels = [TypeormModels];


