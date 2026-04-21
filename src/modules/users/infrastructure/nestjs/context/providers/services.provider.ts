import { TypeormUserRepository } from '@modules/users/infrastructure/persistence/typeorm/user.repository';
import { USER_REPOSITORY } from '@modules/users/core/contracts/UserRepository';

import { HashedServiceImp } from '@modules/users/infrastructure/services/HashedServiceImp';
import { HASHED_SERVICE } from '@modules/users/core/contracts/HashedService';

import { AuthTokenServiceImp } from '@modules/users/infrastructure/services/AuthTokenServiceImp';
import { AUTH_TOKEN_SERVICE } from '@modules/users/core/contracts/AuthTokenService';

export const ServicesProvider = [
  {
    provide: USER_REPOSITORY,
    useClass: TypeormUserRepository,
  },
  {
    provide: HASHED_SERVICE,
    useClass: HashedServiceImp,
  },
  {
    provide: AUTH_TOKEN_SERVICE,
    useClass: AuthTokenServiceImp,
  },
];


