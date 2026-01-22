import { RoleRepository } from "src/access_control/core/role/RoleRepository";
import { DeleteRole } from "./DeleteRole";
import { ErrorUseCase } from "src/shared/app/errors/ErrorUseCase";
import { Role } from "../../core/role/Role";

export class DeleteRoleImp implements DeleteRole {

    constructor(
        private readonly repository : RoleRepository
    ){}

    async execute(id: string): Promise<Role> {

        const role = await this.repository.getOneById(id);

        if(!role) {
            throw new ErrorUseCase("No existe el Role que desea eliminar");
        }

        const processDelete = await this.repository.delete(id);

        if(!processDelete){
            throw new ErrorUseCase("Ocurrio un error, no se pudo eliminar");
        }

        return role;
    }
} 

