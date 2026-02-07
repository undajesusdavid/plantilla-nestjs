import { RoleRepository } from "src/access_control/core/role/RoleRepository";
import { ErrorUseCase } from "src/shared/app/errors/ErrorUseCase";
import { Role } from "../../core/role/Role";
import { BaseUseCase } from "src/shared/app/use-cases/base.use-case";

export class DeleteRoleUseCase extends BaseUseCase<string, Role> {

    constructor(
        private readonly roleRepo : RoleRepository
    ){
        super();
    }

    protected async internalExecute(id: string): Promise<Role> {

        const role = await this.roleRepo.getOneById(id);

        if(!role) {
            throw new ErrorUseCase("No existe el Role que desea eliminar");
        }

        const processDelete = await this.roleRepo.delete(id);

        if(!processDelete){
            throw new ErrorUseCase("Ocurrio un error, no se pudo eliminar");
        }

        return role;
    }
} 

