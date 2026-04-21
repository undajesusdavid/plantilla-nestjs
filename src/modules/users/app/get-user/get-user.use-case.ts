import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { User } from '@modules/users/core/entities/User';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { NotFoundError } from '@shared/core/errors/app-error';
import { GetUserQuery } from './get-user.query';

export const GETUSER_USERCASE = Symbol('GetUserUseCase');

export class GetUserUseCase extends BaseUseCase<GetUserQuery, User> {
  static readonly HANDLED_QUERY = GetUserQuery;

  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  protected async internalExecute(query: GetUserQuery): Promise<User> {
    const id = query.id;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User', id);
    }
    return user;
  }
}


