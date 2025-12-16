import { RoleID } from "../../core/RoleId";
import { Role } from "../../core/Role";


export interface RoleRepository {
    getAll(): Promise<Role[]>;
    getOneById(id: RoleID): Promise<Role | null>;
    getOneByName(name: string): Promise<Role | null>;
    changeRoleStatus(id: RoleID, status: boolean): Promise<boolean>;
}

export const RoleRepositoryToken = Symbol("RoleRepository");