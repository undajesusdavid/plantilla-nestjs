import { RoleID } from "./RoleId";

export interface RoleProps {
    id: RoleID,
    name: string,
    description: string,
    isActive?: boolean
}

export class Role {
    readonly id: RoleID;
    readonly name: string;
    readonly description: string;
    readonly isActive: boolean;

    constructor(props: RoleProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.isActive = props.isActive ?? true;
    }

    getId(): RoleID {
        return this.id;
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
    getProps(): RoleProps {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            isActive: this.isActive
        }
    }
}