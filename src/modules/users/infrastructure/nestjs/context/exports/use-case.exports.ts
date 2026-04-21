import { AuthUserUseCase } from '@modules/users/app/auth-user/auth-user.use-case';
import { CreateUserUseCase } from '@modules/users/app/create-user/create-user.use-case';
import { DeleteUserUseCase } from '@modules/users/app/delete-user/delete-user.use-case';
import { GetUserUseCase } from '@modules/users/app/get-user/get-user.use-case';
import { GetUsersUseCase } from '@modules/users/app/get-users/get-users.use-case';
import { UpdateUserUseCase } from '@modules/users/app/update-user/update-user.use-case';

export const UseCaseExports = [
  GetUserUseCase,
  GetUsersUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  AuthUserUseCase,
];


