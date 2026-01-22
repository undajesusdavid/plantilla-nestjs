import { Role } from "src/access_control/core/role/Role";

export interface DeleteRole {

    execute(id: string): Promise<Role>;
} 


export const DeleteRoleToken =  Symbol("DeleteRoleToken");