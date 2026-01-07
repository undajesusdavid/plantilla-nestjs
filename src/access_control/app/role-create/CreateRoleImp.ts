import { CreateRole, CreateRolePropsInput, CreateRolePropsOutput } from "./CreateRole";
import { RoleRepository } from "../../core/contracts/RoleRepository";


export class CreateRoleImp implements CreateRole {

    constructor(
        private roleRepo: RoleRepository,
    ) { }

    execute(props: CreateRolePropsInput): Promise<CreateRolePropsOutput> {
        
       throw new Error("Method not implemented.");
    }

}