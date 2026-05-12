import { Role } from '@modules/roles/core/entities/Role';

export class RoleResponseDto {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions?: number[];

  constructor(role: Role) {
    this.id = role.getId();
    this.name = role.getName();
    this.description = role.getDescription();
    this.isActive = role.getIsActive();
    this.permissions = role.getPermissions();
  }
}

export class RoleListResponseDto {
  roles! : RoleResponseDto[];
}
