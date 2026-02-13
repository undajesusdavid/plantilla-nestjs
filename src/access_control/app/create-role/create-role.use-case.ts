import { RoleRepository } from "../../core/role/RoleRepository";
import { PermissionRepository } from "../../core/permission/PermissionRepository";
import { IUuidService } from "src/shared/core/interfaces/uuid-service.interface";
import { Role } from "../../core/role/Role";
import { IUnitOfWork } from "src/shared/core/interfaces/unit-of-work.interface";
import { BaseUseCase } from "src/shared/app/use-cases/base.use-case";
import { CreateRoleCommand } from "./create-role.command";


export class CreateRoleUseCase extends BaseUseCase<CreateRoleCommand, Role> {

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
                throw new Error(`Ya existe un rol con el nombre ${props.name}`);
            }

            // Generamos un nuevo ID para el rol
            const id = this.uuidService.generateUUID();

            // Creamos la entidad del rol
            const role = Role.create({
                id: id,
                name: props.name,
                description: props.description || "",
                isActive: true,
                permissions: props.permissions,
            });

            // Guardamos el rol en el repositorio
            await this.roleRepo.create(role);

            // Retornamos el nuevo rol creado
            return role;

        });

    }

}