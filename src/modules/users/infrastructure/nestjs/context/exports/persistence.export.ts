import { USER_REPOSITORY } from '@modules/users/core/contracts/UserRepository';
import { TypeormUserMapper } from '../../../persistence/typeorm/user.mapper';

export const PersistenceExport = [
  USER_REPOSITORY,
  TypeormUserMapper
];


