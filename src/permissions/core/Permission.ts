import { PermissionID } from "./PermissionID";

export class Permission {
    private _id: PermissionID;
    private _name: string;
    private _description: string;
    private _module: string;
    private _resource: string;
    private _action: string;
    private _isActive: boolean;


    constructor(
        id: PermissionID,
        name: string,
        description: string,
        module: string,
        resource: string,
        action: string,
        isActive: boolean,
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._module = module;
        this._resource = resource;
        this._action = action;
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

    get module(): string | undefined {
        return this._module;
    }

    get resource(): string {
        return this._resource;
    }

    get action(): string {
        return this._action;
    }

    get isActive(): boolean {
        return this._isActive;
    }

}
