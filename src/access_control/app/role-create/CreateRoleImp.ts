import { CreateRole, CreateRolePropsInput, CreateRolePropsOutput } from "./CreateRoleContracts";
import { RoleRepository } from "../contracts/RoleRepository";


export class CreateRoleImp implements CreateRole {

    constructor(
        private roleRepo: RoleRepository,
    ) { }

    execute(props: CreateRolePropsInput): Promise<CreateRolePropsOutput> {
       throw new Error("Method not implemented.");
    }

}