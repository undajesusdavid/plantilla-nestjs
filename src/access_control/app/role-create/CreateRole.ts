import { Role } from "../../core/role/Role";

export interface CreateRolePropsInput {
    name: string;
    description?: string;
    permissions: number[]
}

export interface CreateRole {
    execute(props: CreateRolePropsInput): Promise<Role>;
}

export const CreateRoleToken = Symbol('CreateRole');