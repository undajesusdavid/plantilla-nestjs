import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { GetPermissionsQuery } from './get-permissions.query';
import { Permission } from '@modules/permissions/core/entities/Permission';
import { PermissionRepository } from '@modules/permissions/core/contracts/PermissionRepository';

export class GetPermissionsUseCase extends BaseUseCase<GetPermissionsQuery, Permission[]> {
  static readonly HANDLED_QUERY = GetPermissionsQuery;

  constructor(private readonly permissionRepository: PermissionRepository) {
    super();
  }

  protected async internalExecute(): Promise<Permission[]> {
    const permissions = await this.permissionRepository.findAll();
    return permissions.filter((perm) => perm.getName() !== "*:*" ); 
  }
}


