import { IBaseRepository } from "src/shared/core/interfaces/base-repository.interface";
import { Role } from "./Role";

export const ROLE_REPOSITORY = Symbol("RoleRepository");

export interface RoleRepository extends IBaseRepository<Role, string> {
    findByName(name: string): Promise<Role | null>;
    create(role: Role): Promise<void>;
    assignPermissions(roleId : string, permissionIds : number []): Promise<void>;
}

