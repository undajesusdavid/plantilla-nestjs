import { Injectable } from '@nestjs/common';
import { BaseMapper } from '@shared/infrastructure/base/mapper/base.mapper';
import { User } from '@modules/users/core/entities/User';
import { UserOrmEntity } from './user.model';

@Injectable()
export class TypeormUserMapper extends BaseMapper<User, UserOrmEntity> {
  toDomain(model: UserOrmEntity): User {
    const roles = model.roles ? model.roles.map((role) => role.name) : [];
    const permissions = model.roles
      ? model.roles.flatMap((role) =>
          role.permissions ? role.permissions.map((permission) => permission.name) : [],
        )
      : [];

    return new User({
      id: model.id,
      username: model.username,
      password: model.password,
      email: model.email,
      active: model.active,
      roles,
      permissions,
    });
  }

  toPersistence(entity: User): UserOrmEntity {
    const model = new UserOrmEntity();
    model.id = entity.getId();
    model.username = entity.getUsername();
    model.password = entity.getPassword();
    model.email = entity.getEmail();
    model.active = entity.isActive();
    return model;
  }
}


