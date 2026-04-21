import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RoleRepository } from '@modules/roles/core/contracts/RoleRepository';
import { Role } from '@modules/roles/core/entities/Role';
import { TypeormRoleModel } from './role.model';
import { TypeormRoleMapper } from './role.mapper';
import { BaseTypeOrmRepository } from '@shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { TypeormPermissionModel } from '@modules/permissions/infrastructure/persistence/typeorm/permission.model';
import { ErrorRepositoryService } from '@shared/app/errors/ErrorRepositoryService';

@Injectable()
export class TypeormRoleRepository
  extends BaseTypeOrmRepository<Role, TypeormRoleModel, string>
  implements RoleRepository
{
  constructor(
    @InjectRepository(TypeormRoleModel)
    private readonly roleRepository: Repository<TypeormRoleModel>,
  ) {
    super(roleRepository, new TypeormRoleMapper());
  }

  async create(role: Role): Promise<void> {
    try {
      const roleEntity = this.mapper.toPersistence(role);
      if (role.getPermissions().length > 0) {
        const permissions = await this.roleRepository.manager.findBy(
          TypeormPermissionModel,
          {
            id: In(role.getPermissions()),
          },
        );
        roleEntity.permissions = permissions;
      }
      await this.entityRepository.save(roleEntity);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar registrar el rol',
        'ROLES_CREATE_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'create',
        },
      );
    }
  }

  async assignPermissions(roleId: string, permissionIds: number[]): Promise<void> {
    try {
      const role = await this.entityRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      });

      if (!role) {
        throw new ErrorRepositoryService('Rol no encontrado', 'ROLES_NOT_FOUND', {
          originalError: null,
          class: this.constructor.name,
          method: 'assignPermissions',
        });
      }

      const permissions = await this.roleRepository.manager.findBy(
        TypeormPermissionModel,
        {
          id: In(permissionIds),
        },
      );
      role.permissions = permissions;
      await this.entityRepository.save(role);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar asignar permisos al rol',
        'ROLES_ASSIGN_PERMISSIONS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'assignPermissions',
        },
      );
    }
  }

  async findByName(name: string): Promise<Role | null> {
    try {
      const role = await this.entityRepository.findOne({
        where: { name },
        relations: ['permissions'],
      });
      return role ? this.mapper.toDomain(role) : null;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el rol por nombre',
        'ROLES_FINDBYNAME_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findByName',
        },
      );
    }
  }
}


