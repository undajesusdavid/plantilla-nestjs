import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { Role } from '@modules/roles/core/entities/Role';

import { GetRolesQuery } from './get-roles.query';
import { RoleRepository } from '@modules/roles/core/contracts/RoleRepository';

export class GetRolesUseCase extends BaseUseCase<GetRolesQuery, Role[]> {
  static readonly HANDLED_QUERY = GetRolesQuery;

  constructor(private readonly roleRepository: RoleRepository) {
    super();
  }

  protected async internalExecute(): Promise<Role[]> {
  
    const roles = await this.roleRepository.findAll();
    
    return roles.filter((role) => role.getName() !== "root" ); 
   
  }
}


