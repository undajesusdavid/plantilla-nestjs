import { Role } from "../../core/role/Role";
import { UpdateRole, type UpdateRolePropsInput } from "./UpdateRole";
import { RoleRepository } from "src/access_control/core/role/RoleRepository";
import { TransactionManager } from "src/database/core/contracts/TransactionManager";
import { PermissionRepository } from "src/access_control/core/permission/PermissionRepository";
import { isArray } from "class-validator";
import { ErrorUseCase } from "src/shared/app/errors/ErrorUseCase";

export class UpdateRoleImp implements UpdateRole {

    constructor(
        private roleRepo: RoleRepository,
        private permissionRepo: PermissionRepository,
        private transaction: TransactionManager

    ) { }

    async execute(id: string, props: UpdateRolePropsInput): Promise<Role> {

        console.log(props);
        // 1. Verificamos que halla almenos un elemento por actualizar.
        if (Object.keys(props).length === 0) {
            throw new Error("No se realizo ningun cambio en el rol");
        }

        // 2. Iniciamos una transaccion
        return await this.transaction.run(async () => {

            // 3. Optenemos de la base de datos el rol que se quiere actualizar
            const role = await this.roleRepo.getOneById(id);

            // 4. Detenemos la ejecucion si no existe el rol que se quiere actualizar.
            if (!role) {
                throw new Error("No existe el rol que desea actualizar");
            }

            // 5. Actualizamos las propiedades del Rol, enviadas desde el cliente.
            if (props.name) role.setName(props.name);
            if (props.description) role.setDescription(props.description);
            if (props.isActive) role.setIsActive(props.isActive);

            // 6. Guardamos las actualizacion hechas al rol en la base de datos.
            const updateProcess = await this.roleRepo.saveRoleUpdated(role);

            // 7. Detenemos la ejecución si ocurre un error en el proceso.
            if (!updateProcess) {
                throw new Error("Error al intentar guardar los cambios");
            }

            // 8. Sino existe la propiedad permissions, terminamos la actualizacion.
            if (!Object.hasOwn(props, 'permissions')) {
                return role;
            }

            // Si no esta vacio actualizamos los permisos
            const p = props.permissions;
            if (!p || !isArray(p) || p.length === 0) {
                throw new ErrorUseCase(
                    `Debe dejarle al menos un permiso al rol`
                );
            }

            const foundIds = await this.permissionRepo.findExistingIds(p);
            const missingIds = p.filter(id => !foundIds.includes(id));
            if (missingIds.length > 0) {
                throw new ErrorUseCase(
                    `Operación fallida. Los siguientes IDs de permisos no existen: ${missingIds.join(', ')}`
                );
            }

            const processAssing = await this.roleRepo.saveAssignedPermissions(role.getId(), foundIds);
            
            if(processAssing){
                role.setPermissions(foundIds);
            }else{
                throw new ErrorUseCase(
                    `Ocurrio un error inesperado al intetar actualizar los permisos del rol`
                );
            }

            return role;
        })

    }

}