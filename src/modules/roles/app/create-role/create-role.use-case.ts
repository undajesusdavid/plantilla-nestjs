import type { RoleRepository } from '@modules/roles/core/contracts/RoleRepository';
import type { PermissionRepository } from '@modules/permissions/core/contracts/PermissionRepository';
import type { IUuidService } from '@shared/core/interfaces/uuid-service.interface';
import { Role } from '@modules/roles/core/entities/Role';
import type { IUnitOfWork } from '@shared/core/interfaces/unit-of-work.interface';
import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { CreateRoleCommand } from './create-role.command';
import { DuplicateRoleNameError } from '../errors/DuplicateRoleNameError';

export class CreateRoleUseCase extends BaseUseCase<CreateRoleCommand, Role> {
  static readonly HANDLED_COMMAND = CreateRoleCommand;

  constructor(
    private uow: IUnitOfWork,
    private uuidService: IUuidService,
    private roleRepo: RoleRepository,
    private permissionRepo: PermissionRepository,
  ) {
    super();
  }

  protected async internalExecute(command: CreateRoleCommand): Promise<Role> {
    const props = command.props;

    return this.uow.runInTransaction(async () => {
      // Verificamos si ya existe un rol con el mismo nombre
      const existRole = await this.roleRepo.findByName(props.name);
      if (existRole) {
        throw new DuplicateRoleNameError(props.name);
      }

      // Verificamos y obtenemos los permisos
      const permissions = await this.permissionRepo.findAllByIds(props.permissions)
      if(permissions.length !== props.permissions.length ){
        throw new Error("Uno de los permisos asignados no existen");
      }

      // Generamos un nuevo ID para el rol
      const id = this.uuidService.generateUUID();
      

      // Creamos la entidad del rol
      const role = Role.create({
        id: id,
        name: props.name,
        description: props.description || '',
        isActive:  props.isActive,
      });

      // Asignamos los permisos al objeto Role
      role.setPermissions(permissions.map(p => ({
        id: p.getId(),
        name: p.getName(),
        description: p.getDescription(),
        isActive: p.getIsActive()
      }) ));

      // Guardamos el rol en el repositorio
      await this.roleRepo.create(role);

      // Retornamos el nuevo rol creado
      return role;
    });
  }
}


