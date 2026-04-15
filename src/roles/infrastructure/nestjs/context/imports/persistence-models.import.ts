import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormRoleModel } from '../../../persistence/typeorm/role.model';
import { TypeormPermissionModel } from '../../../../../permissions/infrastructure/persistence/typeorm/permission.model';

const TypeormModels = TypeOrmModule.forFeature([
  TypeormRoleModel,
  TypeormPermissionModel,
]);

export const PersistenceModels = [TypeormModels];
