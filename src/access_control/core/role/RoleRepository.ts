import { Role } from "./Role";


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

export const RoleRepositoryToken = Symbol("RoleRepository");