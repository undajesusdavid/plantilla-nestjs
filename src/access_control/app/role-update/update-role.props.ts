
export interface UpdateRolePropsInput {
    id: string,
    data: {
        name?: string;
        description?: string;
        isActive?: boolean;
        permissions?: number[];
    }
}


