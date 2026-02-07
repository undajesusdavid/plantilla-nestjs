
export interface UpdateRolePropsInput {
    readonly id: string,
    readonly data: {
        readonlyname?: string;
        description?: string;
        isActive?: boolean;
        permissions?: number[];
    }
}


