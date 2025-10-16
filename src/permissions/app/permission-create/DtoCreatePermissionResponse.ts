export interface PermissionPropsResponse {
    name: string;
    description: string;
    module: string;
    resource: string;
    action: string;
    isActive: boolean;
}

export class DtoCreatePermissionResponse {

    constructor(
        private name: string,
        private description: string,
        private module: string,
        private resource: string,
        private action: string,
        private isActive: boolean,
    ) { }
}