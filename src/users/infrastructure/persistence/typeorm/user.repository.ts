import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserRepository } from 'src/users/core/contracts/UserRepository';
import { User } from 'src/users/core/entities/User';
import { UserOrmEntity } from './user.model';
import { TypeormUserMapper } from './user.mapper';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { TypeormRoleModel } from 'src/roles/infrastructure/persistence/typeorm/role.model';
import { ErrorRepositoryService } from 'src/users/app/errors/ErrorRepositoryService';

@Injectable()
export class TypeormUserRepository
  extends BaseTypeOrmRepository<User, UserOrmEntity, string>
  implements UserRepository
{
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {
    super(userRepository, new TypeormUserMapper());
  }

  async create(user: User): Promise<boolean> {
    try {
      await this.save(user);
      return true;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar crear el usuario',
        'USER_CREATE_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'create',
        },
      );
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const record = await this.entityRepository.findOne({
        where: { id } as any,
        relations: ['roles', 'roles.permissions'],
      });
      return record ? this.mapper.toDomain(record) : null;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el usuario por ID',
        'USER_GET_BY_ID_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findById',
        },
      );
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const record = await this.entityRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .addSelect('user.password')
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('roles.permissions', 'permissions')
        .getOne();
      return record ? this.mapper.toDomain(record) : null;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el usuario por username',
        'USER_GET_BY_USERNAME_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findByUsername',
        },
      );
    }
  }

  async usernameExists(username: string): Promise<boolean> {
    try {
      const record = await this.entityRepository.findOneBy({ username });
      return !!record;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar comprobar si el nombre de usuario ya existe',
        'USERNAME_EXISTS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'usernameExists',
        },
      );
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      const record = await this.entityRepository.findOneBy({ email });
      return !!record;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar comprobar si el email ya existe',
        'EMAIL_EXISTS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'emailExists',
        },
      );
    }
  }

  async assingRoles(userId: string, RoleIds: string[]): Promise<void> {
    try {
      const user = await this.entityRepository.findOne({
        where: { id: userId },
        relations: ['roles'],
      });

      if (!user) {
        throw new ErrorRepositoryService('Usuario no encontrado', 'USER_NOT_FOUND', {
          originalError: null,
          class: this.constructor.name,
          method: 'assingRoles',
        });
      }

      const roles = await this.entityRepository.manager.findBy(TypeormRoleModel, {
        id: In(RoleIds),
      });

      user.roles = roles;
      await this.entityRepository.save(user);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar asignar roles al usuario',
        'ASSING_ROLES_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'assingRoles',
        },
      );
    }
  }
}
