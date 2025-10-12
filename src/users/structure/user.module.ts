import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryImp } from './services/UserRepositoryImp';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user.sequealize';

// Services
import { HashedServiceImp } from './services/HashedServiceImp';
import { UuidServiceImp } from './services/UuidServiceImp';
import { AuthTokenServiceImp } from './services/AuthTokenServiceImp';


// uses Case
import { CreateUserImp } from '../app/user-create/CreateUserImp';
import { CreateUserToken  } from '../app/user-create/CreateUser';

import { GetUsersToken } from '../app/get-users/GetUsers';
import { GetUsersImp } from '../app/get-users/GetUsersImp';

import { AuthUserToken } from '../app/user-auth/AuthUser';
import { AuthUserImp } from '../app/user-auth/AuthUserImp';

const CreateUserProvider = {
  provide: CreateUserToken,
  useFactory: (repo: UserRepositoryImp, uuid: UuidServiceImp, hash: HashedServiceImp) => {
    return new CreateUserImp(repo, uuid, hash);
  },
  inject: [UserRepositoryImp, UuidServiceImp, HashedServiceImp],
}

const GetUsersProvider = {
  provide: GetUsersToken,
  useFactory: (repo: UserRepositoryImp) => {
    return new GetUsersImp(repo);
  },
  inject: [UserRepositoryImp],
}

const AuthUserProvider = {
  provide: AuthUserToken,
  useFactory: (
    repo: UserRepositoryImp, 
    authToken: AuthTokenServiceImp, 
    hashed: HashedServiceImp) => {
    return new AuthUserImp(repo,authToken,hashed);
  },
  inject: [UserRepositoryImp,AuthTokenServiceImp,HashedServiceImp],
}


@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [
    UserRepositoryImp,
    HashedServiceImp,
    UuidServiceImp,
    AuthTokenServiceImp,
    CreateUserProvider,
    GetUsersProvider,
    AuthUserProvider,

  ],
  exports: [CreateUserToken, GetUsersToken, AuthUserToken]
})
export class UserModule {

}