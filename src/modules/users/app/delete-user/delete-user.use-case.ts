import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { DeleteUserCommand } from './delete-user.command';
import { User } from '@modules/users/core/entities/User';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { NotFoundError } from '@shared/core/errors/app-error';

export class DeleteUserUseCase extends BaseUseCase<DeleteUserCommand, User> {
  static readonly HANDLED_COMMAND = DeleteUserCommand;

  constructor(private userRepo: UserRepository) {
    super();
  }

  async internalExecute(command: DeleteUserCommand): Promise<User> {
    const { id } = command.props;

    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError('Usuario', id);
    }

    await this.userRepo.delete(user.getId());

    return user;
  }
}


