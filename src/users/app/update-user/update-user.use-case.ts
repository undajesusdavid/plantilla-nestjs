import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { UpdateUserCommand } from './update-user.command';
import { User } from 'src/users/core/entities/User';
import type { UserRepository } from 'src/users/core/contracts/UserRepository';
import { UserNotFoundError, DuplicateUsernameError, DuplicateEmailError } from '../errors';

export class UpdateUserUseCase extends BaseUseCase<UpdateUserCommand, User> {
  static readonly HANDLED_COMMAND = UpdateUserCommand;

  constructor(private userRepo: UserRepository) {
    super();
  }

  async internalExecute(command: UpdateUserCommand): Promise<User> {
    const { id, data } = command.props;

    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }

    // Validar duplicados solo si se intenta cambiar username/email
    if (data.username !== undefined && data.username !== user.getUsername()) {
      const usernameExists = await this.userRepo.usernameExists(data.username);
      if (usernameExists) {
        throw new DuplicateUsernameError(data.username);
      }
      user.setUsername(data.username);
    }

    if (data.email !== undefined && data.email !== user.getEmail()) {
      const emailExists = await this.userRepo.emailExists(data.email);
      if (emailExists) {
        throw new DuplicateEmailError(data.email);
      }
      user.setEmail(data.email);
    }

    if (data.active !== undefined) {
      user.setActive(data.active);
    }

    await this.userRepo.update(user.getId(), user);

    return user;
  }
}
