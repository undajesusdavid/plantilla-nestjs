import { BaseMapper } from '@shared/infrastructure/base/mapper/base.mapper';
import { Role } from '@modules/roles/core/entities/Role';
import { TypeormRoleModel } from './role.model';

export class TypeormRoleMapper extends BaseMapper<Role, TypeormRoleModel> {
  toDomain(model: TypeormRoleModel): Role {
    const role = Role.restore({
      id: model.id,
      name: model.name,
      description: model.description,
      isActive: model.isActive,
    });

    const rolePermission = model.permissions? model.permissions.map((p) => { 
      return { id: p.id, name: p.name, description: p.description, isActive: p.isActive } 
    }): [];

    role.setPermissions(rolePermission);
    return role;
  }

  toPersistence(entity: Role): TypeormRoleModel {
    const model = new TypeormRoleModel();
    model.id = entity.getId();
    model.name = entity.getName();
    model.description = entity.getDescription();
    model.isActive = entity.getIsActive();
    return model;
  }
}


