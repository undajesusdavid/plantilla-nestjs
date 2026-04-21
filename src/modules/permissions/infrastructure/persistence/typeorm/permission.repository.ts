import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PermissionRepository } from '@modules/permissions/core/contracts/PermissionRepository';
import { Permission } from '@modules/permissions/core/entities/Permission';
import { TypeormPermissionModel } from './permission.model';
import { TypeormPermissionMapper } from './permission.mapper';
import { BaseTypeOrmRepository } from '@shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { ErrorRepositoryService } from '@shared/app/errors/ErrorRepositoryService';

@Injectable()
export class TypeormPermissionRepository
  extends BaseTypeOrmRepository<Permission, TypeormPermissionModel, number>
  implements PermissionRepository
{
  constructor(
    @InjectRepository(TypeormPermissionModel)
    private readonly permissionRepository: Repository<TypeormPermissionModel>,
  ) {
    super(permissionRepository, new TypeormPermissionMapper());
  }

  async findByName(name: string): Promise<Permission | null> {
    try {
      const record = await this.entityRepository.findOne({
        where: { name },
      });
      return record ? this.mapper.toDomain(record) : null;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el permiso por nombre',
        'PERMISSION_FINDBYNAME_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findByName',
        },
      );
    }
  }

  async changePermissionStatus(id: string, status: boolean): Promise<boolean> {
    try {
      const result = await this.entityRepository.update(
        { id: Number(id) },
        { isActive: status },
      );
      return (result.affected ?? 0) > 0;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar cambiar el estado del permiso',
        'PERMISSION_CHANGESTATUS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'changePermissionStatus',
        },
      );
    }
  }

  async findExistingIds(ids: number[]): Promise<number[]> {
    try {
      const records = await this.entityRepository.findBy({
        id: In(ids),
      });
      return records.map((record) => record.id);
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener los permisos existentes',
        'PERMISSION_FIND_EXISTING_IDS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findExistingIds',
        },
      );
    }
  }
}


