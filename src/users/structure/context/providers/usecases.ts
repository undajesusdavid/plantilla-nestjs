// Servicios Externos
import { UuidServiceImp } from '../../../../shared/structure/services/UuidServiceImp';
// Servicios
import { UserRepositoryImp } from '../../services/UserRepositoryImp';
import { HashedServiceImp } from '../../services/HashedServiceImp';
import { AuthTokenServiceImp } from '../../services/AuthTokenServiceImp';
// Casos de Uso
import { CreateUserImp } from '../../../app/user-create/CreateUserImp';
import { CreateUserToken } from '../../../app/user-create/CreateUser';
import { UpdateUserImp } from '../../../app/user-update/UpdateUserImp';
import { UpdateUserToken } from '../../../app/user-update/UpdateUser';
import { GetUsersImp } from '../../../app/get-users/GetUsersImp';
import { GetUsersToken } from '../../../app/get-users/GetUsers';
import { DeleteUserImp } from '../../../app/user-delete/DeleteUserImp';
import { DeleteUserToken } from '../../../app/user-delete/DeleteUser';
import { AuthUserImp } from '../../../app/user-auth/AuthUserImp';
import { AuthUserToken } from '../../../app/user-auth/AuthUser';


export const UseCases = [
    {
        provide: CreateUserToken,
        useFactory: (repo: UserRepositoryImp, uuid: UuidServiceImp, hash: HashedServiceImp) =>
            new CreateUserImp(repo, uuid, hash),
        inject: [UserRepositoryImp, UuidServiceImp, HashedServiceImp],
    },
    {
        provide: UpdateUserToken,
        useFactory: (repo: UserRepositoryImp) => new UpdateUserImp(repo),
        inject: [UserRepositoryImp],
    },
    {
        provide: GetUsersToken,
        useFactory: (repo: UserRepositoryImp) => new GetUsersImp(repo),
        inject: [UserRepositoryImp],
    },
    {
        provide: DeleteUserToken,
        useFactory: (repo: UserRepositoryImp) => new DeleteUserImp(repo),
        inject: [UserRepositoryImp],
    },
    {
        provide: AuthUserToken,
        useFactory: (repo: UserRepositoryImp, authToken: AuthTokenServiceImp, hashed: HashedServiceImp) =>
            new AuthUserImp(repo, authToken, hashed),
        inject: [UserRepositoryImp, AuthTokenServiceImp, HashedServiceImp],
    },
];

export const UseCaseExport = [
    ...UseCases.map(u => u.provide)
]