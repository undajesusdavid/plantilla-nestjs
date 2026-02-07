import { Role } from "./Role";

export const ROLE_REPOSITORY = Symbol("RoleRepository");

export interface RoleRepository{
    
    create(role: Role): Promise<void>;
    saveRoleUpdated(role:Role): Promise<boolean>;
    saveAssignedPermissions(roleId : string, permissionIds : number []): Promise<boolean> ;
    delete(id: string ): Promise<boolean>

   
    getAll(): Promise<Role[]>;
    getOneById(id: string): Promise<Role | null>;
    getOneByName(name: string): Promise<Role | null>;
    changeRoleStatus(id: string, status: boolean ): Promise<boolean>;
   
}

