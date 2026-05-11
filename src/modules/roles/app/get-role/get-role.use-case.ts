import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { NotFoundError } from '@shared/core/errors/app-error';
import { GetRoleQuery } from './get-role.query';
import { Role } from '../../core/entities/Role';
import { RoleRepository } from '@modules/roles/core/contracts/RoleRepository';

export const GETROLE_USECASE = Symbol('GetRoleUseCase');

export class GetRoleUseCase extends BaseUseCase<GetRoleQuery, Role> {
  static readonly HANDLED_QUERY = GetRoleQuery;

  constructor(private readonly roleRepository: RoleRepository) {
    super();
  }

  protected async internalExecute(query: GetRoleQuery): Promise<Role> {
    const id = query.id;
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundError('Role', id);
    }
    return role;
  }
}


