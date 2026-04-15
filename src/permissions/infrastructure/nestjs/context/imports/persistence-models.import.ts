import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormPermissionModel } from '../../../persistence/typeorm/permission.model';

const TypeormModels = TypeOrmModule.forFeature([TypeormPermissionModel]);

export const PersistenceModels = [TypeormModels];
