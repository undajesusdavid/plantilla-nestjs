import { UserRepositoryImp } from "../../repositories/sequelize/UserRepositoryImp";
import { USER_REPOSITORY } from "src/users/core/contracts/UserRepository";

import { HashedServiceImp } from "../../services/HashedServiceImp";
import { HASHED_SERVICE } from "src/users/core/contracts/HashedService";

import { AuthTokenServiceImp } from "../../services/AuthTokenServiceImp";
import { AUTH_TOKEN_SERVICE } from "src/users/core/contracts/AuthTokenService";


export const Services = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepositoryImp,
  },
  {
    provide: HASHED_SERVICE,
    useClass: HashedServiceImp,
  },
  {
    provide: AUTH_TOKEN_SERVICE,
    useClass: AuthTokenServiceImp,
  },
]


export const ServicesExport = [
  USER_REPOSITORY,
  HASHED_SERVICE,
  AUTH_TOKEN_SERVICE,
]