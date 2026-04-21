// Servicios Externos

// Servicios
import {
  USER_REPOSITORY,
  UserRepository,
} from '@modules/users/core/contracts/UserRepository';
import {
  HASHED_SERVICE,
  HashedService,
} from '@modules/users/core/contracts/HashedService';
import {
  AUTH_TOKEN_SERVICE,
  AuthTokenService,
} from '@modules/users/core/contracts/AuthTokenService';
import {
  UUID_SERVICE,
  IUuidService,
} from '@shared/core/interfaces/uuid-service.interface';
// Casos de Uso

import { GetUserUseCase } from '@modules/users/app/get-user/get-user.use-case';
import { GetUsersUseCase } from '@modules/users/app/get-users/get-users.use-case';
import { AuthUserUseCase } from '@modules/users/app/auth-user/auth-user.use-case';
import { CreateUserUseCase } from '@modules/users/app/create-user/create-user.use-case';
import { UpdateUserUseCase } from '@modules/users/app/update-user/update-user.use-case';
import { DeleteUserUseCase } from '@modules/users/app/delete-user/delete-user.use-case';
import { GetMyPermissionsUseCase } from '@modules/users/app/get-my-permissions/get-my-permissions.use-case';

export const UseCasesProvider = [
  {
    provide: GetMyPermissionsUseCase,
    useFactory: (repo: UserRepository) => new GetMyPermissionsUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: GetUserUseCase,
    useFactory: (repo: UserRepository) => new GetUserUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: CreateUserUseCase,
    useFactory: (
      repo: UserRepository,
      uuid: IUuidService,
      hash: HashedService,
    ) => new CreateUserUseCase(repo, uuid, hash),
    inject: [USER_REPOSITORY, UUID_SERVICE, HASHED_SERVICE],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (repo: UserRepository) => new UpdateUserUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: GetUsersUseCase,
    useFactory: (repo: UserRepository) => new GetUsersUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: DeleteUserUseCase,
    useFactory: (repo: UserRepository) => new DeleteUserUseCase(repo),
    inject: [USER_REPOSITORY],
  },
  {
    provide: AuthUserUseCase,
    useFactory: (
      repo: UserRepository,
      authToken: AuthTokenService,
      hashed: HashedService,
    ) => new AuthUserUseCase(repo, authToken, hashed),
    inject: [USER_REPOSITORY, AUTH_TOKEN_SERVICE, HASHED_SERVICE],
  },
];


