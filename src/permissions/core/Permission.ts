import { PermissionId } from "./PermissionId";

export interface PermissionProps {
    id: PermissionId,
    name: string,
    description: string
}


export class Permission {

    readonly id: PermissionId;
    readonly name: string;
    readonly description: string;

    constructor(props: PermissionProps) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
    }

}