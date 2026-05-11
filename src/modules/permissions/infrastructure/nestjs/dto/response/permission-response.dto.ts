import { Permission } from '@modules/permissions/core/entities/Permission';

export class PermissionResponseDto {
  id: number;
  name: string;
  description: string;
  isActive?: boolean;

  constructor(perm: Permission) {
    this.id = perm.getId();
    this.name = perm.getName();
    this.description = perm.getDescription();
    this.isActive = perm.getIsActive();
  }
}

export class PermissionsResponseDto {
  permissions! : PermissionResponseDto[];
}
