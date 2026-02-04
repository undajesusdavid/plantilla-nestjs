import { CreateRole, CreateRolePropsInput } from "./CreateRole";
import { RoleRepository } from "../../core/role/RoleRepository";
import { UuidService } from "src/shared/core/contracts/UuidService";
import { Role } from "../../core/role/Role";


export class CreateRoleImp implements CreateRole {

    constructor(
        private uuidService: UuidService,
        private repository: RoleRepository,
    ) { }

    async execute(props: CreateRolePropsInput): Promise<Role> {

        // Verificamos si ya existe un rol con el mismo nombre
        const existRole = await this.repository.getOneByName(props.name);
        if(existRole){
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
        await this.repository.create(role);
       
        // Retornamos el nuevo rol creado
        return role;
    }

}