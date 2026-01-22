import { Role } from "./Role";


export interface RoleRepository{
    
   
    saveRoleUpdated(role:Role): Promise<boolean>;
    saveAssignedPermissions(roleId : string, permissionIds : number []): Promise<boolean> ;
    delete(id: string ): Promise<boolean>

    create(role: Role, permissions: number[]): Promise<Role | null>;
    getAll(): Promise<Role[]>;
    getOneById(id: string): Promise<Role | null>;
    getOneByName(name: string): Promise<Role | null>;
    changeRoleStatus(id: string, status: boolean ): Promise<boolean>;
   
}

export const RoleRepositoryToken = Symbol("RoleRepository");