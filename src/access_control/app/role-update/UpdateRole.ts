import { Role } from "../../core/role/Role";


export interface UpdateRolePropsInput {
    name?: string; 
    description?: string;
    isActive?: boolean;
    permissions?: number[];  
}

export interface UpdateRole {
    execute(id: string, props : UpdateRolePropsInput) : Promise<Role>
}

export const UpdateRoleToken = Symbol("UpdateRole");