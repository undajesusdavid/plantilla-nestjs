
export interface UpdateRolePropsInput {
    readonly id: string,
    data: {
        readonly name?: string;
        readonly description?: string;
        readonly isActive?: boolean;
        readonly permissions?: number[];
    }
}


