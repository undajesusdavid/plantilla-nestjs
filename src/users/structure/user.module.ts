import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepositoryImp } from './services/UserRepositoryImp';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.sequealize';

// Services
import { HashedServiceImp } from './services/HashedServiceImp';
import { UuidServiceImp } from 'src/shared/structure/services/UuidServiceImp';
import { AuthTokenServiceImp } from './services/AuthTokenServiceImp';


// uses Case
import { CreateUserImp } from '../app/user-create/CreateUserImp';
import { CreateUserToken } from '../app/user-create/CreateUser';

import { UpdateUserImp } from '../app/user-update/UpdateUserImp';
import { UpdateUserToken } from '../app/user-update/UpdateUser';

import { GetUsersToken } from '../app/get-users/GetUsers';
import { GetUsersImp } from '../app/get-users/GetUsersImp';

import { DeleteUserToken } from '../app/user-delete/DeleteUser';
import { DeleteUserImp } from '../app/user-delete/DeleteUserImp';

import { AuthUserToken } from '../app/user-auth/AuthUser';
import { AuthUserImp } from '../app/user-auth/AuthUserImp';
import { SharedModule } from 'src/shared/structure/shared.module';


const CreateUserProvider = {
  provide: CreateUserToken,
  useFactory: (repo: UserRepositoryImp, uuid: UuidServiceImp, hash: HashedServiceImp) => {
    return new CreateUserImp(repo, uuid, hash);
  },
  inject: [UserRepositoryImp, UuidServiceImp, HashedServiceImp],
}

const UpdateUserProvider = {
  provide: UpdateUserToken,
  useFactory: (repo: UserRepositoryImp) => {
    return new UpdateUserImp(repo);
  },
  inject: [UserRepositoryImp],
}

const GetUsersProvider = {
  provide: GetUsersToken,
  useFactory: (repo: UserRepositoryImp) => {
    return new GetUsersImp(repo);
  },
  inject: [UserRepositoryImp],
}

const DeleteUserProvider = {
  provide: DeleteUserToken,
  useFactory: (repo: UserRepositoryImp) => {
    return new DeleteUserImp(repo);
  },
  inject: [UserRepositoryImp],
}

const AuthUserProvider = {
  provide: AuthUserToken,
  useFactory: (
    repo: UserRepositoryImp,
    authToken: AuthTokenServiceImp,
    hashed: HashedServiceImp) => {
    return new AuthUserImp(repo, authToken, hashed);
  },
  inject: [UserRepositoryImp, AuthTokenServiceImp, HashedServiceImp],
}


@Module({
  imports: [SharedModule, SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    UserRepositoryImp,
    HashedServiceImp,
    AuthTokenServiceImp,
    CreateUserProvider,
    UpdateUserProvider,
    GetUsersProvider,
    DeleteUserProvider,
    AuthUserProvider,

  ],
  exports: [CreateUserToken, UpdateUserToken, GetUsersToken, DeleteUserToken, AuthUserToken]
})
export class UserModule {

}