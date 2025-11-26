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
    readonly isActive?: boolean;

    constructor(props: RoleProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.isActive = props.isActive ?? true;
    }
}