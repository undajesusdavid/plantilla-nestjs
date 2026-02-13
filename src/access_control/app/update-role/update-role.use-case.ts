import { Role } from "../../core/role/Role";
import { RoleRepository } from "src/access_control/core/role/RoleRepository";
import { IUnitOfWork } from "src/shared/core/interfaces/unit-of-work.interface";
import { PermissionRepository } from "src/access_control/core/permission/PermissionRepository";
import { ErrorUseCase } from "src/shared/app/errors/ErrorUseCase";
import { BaseUseCase } from "src/shared/app/use-cases/base.use-case";
import { UpdateRoleCommand } from "./update-role.command";

export class UpdateRoleUseCase extends BaseUseCase<UpdateRoleCommand, Role> {

    constructor(
        private roleRepo: RoleRepository,
        private permissionRepo: PermissionRepository,
        private uow: IUnitOfWork
    ) {
        super();
    }

    protected async internalExecute(command: UpdateRoleCommand): Promise<Role> {

        const {id, data} = command.props;
        
        //Verificamos que halla almenos un elemento por actualizar.
        if (Object.keys(data).length === 0) {
            throw new Error("No se proporcionaron datos para actualizar");
        }

        // Iniciamos una transaccion
        return await this.uow.runInTransaction(async () => {
            // Validamos que el rol a actualizar exista
            const role = await this.roleRepo.findById(id);

            if (!role) {
                throw new Error("No existe el rol que desea actualizar");
            }
            // Validacmos los permisos a asignar (si es que se proporcionan)
            if ('permissions' in data) {
                const p = data.permissions;
                if (!Array.isArray(p) || p.length === 0) {
                    throw new ErrorUseCase(`Debe dejarle al menos un permiso al rol`);
                }
                const { existingIds, missingIds } = await this.permissionRepo.checkIdsExistence(p);
                
                if (missingIds.length > 0) {
                    throw new ErrorUseCase(
                        `Operación fallida. Los siguientes IDs de permisos no existen: ${missingIds.join(', ')}`
                    );
                }
                await this.roleRepo.assignPermissions(role.getId(), existingIds);
            };

            // Actualizamos los datos base del rol
            if (data.name) role.setName(data.name);
            if (data.description) role.setDescription(data.description);
            if (data.isActive !== undefined) role.setIsActive(data.isActive);
            
            await this.roleRepo.save(role);
            return role;
        });

    }

}