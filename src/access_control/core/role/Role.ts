import { RoleID } from "./RoleId";

export interface RoleProps {
    id: string,
    name: string,
    description: string,
    isActive: boolean
}

export class Role {
    private readonly id: RoleID;
    private  name: string;
    private description: string;
    private isActive: boolean;
    private permissions : number[]

    constructor(props: RoleProps) {
        this.id = new RoleID(props.id);
        this.name = props.name;
        this.description = props.description;
        this.isActive = props.isActive;
    }

    setPermissions(permissions: number[]){
        this.permissions = permissions;
    }

    getId(): string {
        return this.id.toString();
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }
    getIsActive(): boolean {
        return this.isActive!;
    }
    
    getPermisions(): number[] {
        return this.permissions;
    }

    getProps(): RoleProps {
        return {
            id: this.id.toString(),
            name: this.name,
            description: this.description,
            isActive: this.isActive
        }
    }

    setName(name: string): void{
        this.name = name;
    }

    setDescription(description: string): void{
        this.description = description;
    }

    setIsActive(status : boolean){
        this.isActive = status;
    }
}