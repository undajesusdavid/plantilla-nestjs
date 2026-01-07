import { RoleID } from "../entities/RoleId";
import { Role } from "../entities/Role";


export interface RoleRepository {
    create(Role: Role): Promise<boolean>;
    getAll(): Promise<Role[]>;
    getOneById(id: RoleID): Promise<Role | null>;
    getOneByName(name: string): Promise<Role | null>;
    changeRoleStatus(id: RoleID, status: boolean): Promise<boolean>;
}

export const RoleRepositoryToken = Symbol("RoleRepository");