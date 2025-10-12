import { RoleId } from "./RoleId";

export interface RoleProps {
    id: RoleId,
    name: string,
    description: string
}


export class Role {
    readonly id: RoleId;
    readonly name: string;
    readonly description: string;

    constructor(props: RoleProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
    }
}