import { RoleID } from "./value-objetcs/RoleId";
import { RoleName } from "./value-objetcs/RoleName";
import { RolePermissionList } from "./value-objetcs/RolePermissionList";

export interface RoleProps {
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    permissions: number[]
}

export class Role {
    private readonly id: RoleID;
    private name: RoleName;
    private description: string;
    private isActive: boolean;
    private permissions : RolePermissionList;

    private constructor(props: RoleProps) {
        this.id = new RoleID(props.id);
        this.name = new RoleName(props.name);
        this.description = props.description;
        this.isActive = props.isActive;
        this.permissions = new RolePermissionList(props.permissions);
    }

    public static create(props: RoleProps): Role {
        return new Role({...props, isActive: true});
    }

    public static restore(props: RoleProps): Role {
        return new Role(props);
    }

    setPermissions(permissions: number[]){
        this.permissions = new RolePermissionList(permissions);
    }

    getId(): string {
        return this.id.getValue();
    }

    getName(): string {
        return this.name.getValue();
    }

    getDescription(): string {
        return this.description;
    }

    getIsActive(): boolean {
        return this.isActive!;
    }
    
    getPermissions(): number[] {
        return this.permissions.getValue();
    }

    getProps(): RoleProps {
        return {
            id: this.id.getValue(),
            name: this.name.getValue(),
            description: this.description,
            isActive: this.isActive,
            permissions: this.permissions.getValue()
        }
    }

    setName(name: string): void{
        this.name = new RoleName(name);
    }

    setDescription(description: string): void{
        this.description = description;
    }

    setIsActive(status : boolean){
        this.isActive = status;
    }
}