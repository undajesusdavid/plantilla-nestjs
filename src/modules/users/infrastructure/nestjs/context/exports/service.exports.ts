import { AUTH_TOKEN_SERVICE } from '@modules/users/core/contracts/AuthTokenService';
import { HASHED_SERVICE } from '@modules/users/core/contracts/HashedService';
import { USER_REPOSITORY } from '@modules/users/core/contracts/UserRepository';

export const ServiceExports = [
  USER_REPOSITORY,
  HASHED_SERVICE,
  AUTH_TOKEN_SERVICE,
];


