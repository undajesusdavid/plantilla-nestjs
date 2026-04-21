import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '@modules/users/infrastructure/persistence/typeorm/user.model';

const TypeormModels = TypeOrmModule.forFeature([UserOrmEntity]);

export const PersistenceModels = [TypeormModels];


