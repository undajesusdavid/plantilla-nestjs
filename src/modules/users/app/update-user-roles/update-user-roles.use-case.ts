import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { UpdateUserRolesCommand } from './update-user-roles.command';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { UserNotFoundError } from '@src/modules/users/core/errors';

export class UpdateUserRolesUseCase extends BaseUseCase<UpdateUserRolesCommand, void> {
  static readonly HANDLED_COMMAND = UpdateUserRolesCommand;

  constructor(private userRepo: UserRepository) {
    super();
  }

  async internalExecute(command: UpdateUserRolesCommand): Promise<void> {
    const { id, data } = command.props;

    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }

    await this.userRepo.assignRoles(user.getId() , data.roles);
  }
}


