import { NumberListValueObject } from "src/shared/core/value-objects/NumberListValueObject";

export class RolePermissionList extends NumberListValueObject {
    

    constructor(permissions: number[]) {
        super(permissions);
        this.validatePermissions(permissions);
       
    }

    private validatePermissions(permissions: number[]): void {
        if(permissions.length === 0) {
            throw new Error("El role debe tener al menos un permiso asignado");
        }
    }

}