import { PermissionID } from "./PermissionId";

export class Permission {
    private _id: PermissionID;
    private _name: string;
    private _description: string;
    private _isActive: boolean;


    constructor(
        id: PermissionID,
        name: string,
        description: string,
        isActive: boolean,
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._isActive = isActive;
    }

    get id(): string {
        return this._id.toString();
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get isActive(): boolean {
        return this._isActive;
    }

}
