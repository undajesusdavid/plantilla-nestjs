import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { GetMyPermissionsQuery } from './get-my-permissions.query';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { UserNotFoundError } from '@modules/users/app/errors';

export interface MyPermissionsResponse {
  roles: string[];
  permissions: string[];
}

export class GetMyPermissionsUseCase extends BaseUseCase<GetMyPermissionsQuery, MyPermissionsResponse> {
  static readonly HANDLED_QUERY = GetMyPermissionsQuery;

  constructor(private readonly userRepo: UserRepository) {
    super();
  }

  protected async internalExecute(query: GetMyPermissionsQuery): Promise<MyPermissionsResponse> {
    const user = await this.userRepo.findById(query.userId);
    if (!user) {
      throw new UserNotFoundError(query.userId);
    }

    return {
      roles: user.getRoles(),
      permissions: user.getPermissions(),
    };
  }
}


