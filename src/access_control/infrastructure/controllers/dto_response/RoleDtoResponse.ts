import { Role } from "../../../core/role/Role";


export class RoleDtoResponse {
    id: string;
    name: string;
    description: string;
    permissions: number[];
    
    constructor(role: Role) {
        this.id = role.getId();
        this.name = role.getName();
        this.description = role.getDescription();
        this.permissions = role.getPermissions();
    }
}

interface PermissionDTO {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

