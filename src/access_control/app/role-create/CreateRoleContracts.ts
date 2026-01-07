export interface CreateRolePropsInput {
    name: string;
    description?: string;
}

export interface CreateRolePropsOutput {
    id: string;
    name: string;
    description?: string;
}

export interface CreateRole {
    execute(props: CreateRolePropsInput): Promise<CreateRolePropsOutput>;
}

export const CreateRoleToken = Symbol('CreateRole');