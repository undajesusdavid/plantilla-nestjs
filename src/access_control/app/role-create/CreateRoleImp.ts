import { CreateRole, CreateRolePropsInput } from "./CreateRole";
import { RoleRepository } from "../../core/role/RoleRepository";
import { UuidService } from "src/shared/core/contracts/UuidService";
import { Role } from "../../core/role/Role";
import { RoleID } from "src/access_control/core/role/RoleId";


export class CreateRoleImp implements CreateRole {

    constructor(
        private uuidService: UuidService,
        private roleRepo: RoleRepository,
    ) { }

    async execute(props: CreateRolePropsInput): Promise<Role> {

        const existRole = await this.roleRepo.getOneByName(props.name);
        if(existRole){
            throw new Error(`Ya existe un rol con el nombre ${props.name}`);
        }

        const id = this.uuidService.generateUUID();
        if (!RoleID.isValid(id)) {
            throw new Error("El ID generado no es una version de UUID valida")
        }

        const newRole = new Role({
            id: id,
            name: props.name,
            description: props.description || "",
            isActive: true,
        });

        const role = await this.roleRepo.create(newRole, props.permissions);
        if (!role) {
            throw new Error("El rol no pudo ser registrado");
        }

        return role;
    }

}