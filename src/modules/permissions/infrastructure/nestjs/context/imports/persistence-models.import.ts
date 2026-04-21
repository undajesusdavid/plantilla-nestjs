import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormPermissionModel } from '@modules/permissions/infrastructure/persistence/typeorm/permission.model';

const TypeormModels = TypeOrmModule.forFeature([TypeormPermissionModel]);

export const PersistenceModels = [TypeormModels];


