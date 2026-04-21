import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { AuthUserCommand } from './auth-user.command';
import { AuthUserResponse } from './auth-user.response';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import type { AuthTokenService } from '@modules/users/core/contracts/AuthTokenService';
import type { HashedService } from '@modules/users/core/contracts/HashedService';
import {
  UserNotFoundError,
  UserInactiveError,
  InvalidCredentialsError,
} from '@modules/users/app/errors';

export class AuthUserUseCase extends BaseUseCase<
  AuthUserCommand,
  AuthUserResponse
> {
  static readonly HANDLED_COMMAND = AuthUserCommand;

  constructor(
    private userRepo: UserRepository,
    private authToken: AuthTokenService,
    private hashed: HashedService,
  ) {
    super();
  }

  async internalExecute(command: AuthUserCommand): Promise<AuthUserResponse> {
    const { username, password } = command;

    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new UserNotFoundError(username);
    }
    if (!user.isActive()) {
      throw new UserInactiveError(user.getId());
    }

    const isPassword = this.hashed.compare(password, user.getPassword());
    if (!isPassword) {
      throw new InvalidCredentialsError();
    }

    const userId = user.getId();
    const userName = user.getUsername();
    const token = await this.authToken.auth({
      id: userId,
      username: userName,
    });

    return {
      token: token,
      id: userId,
      username: userName,
    } as AuthUserResponse;
  }
}


