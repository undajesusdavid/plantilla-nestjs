import { PermissionID } from "./PermissionId";

class Permission {
    private _id: PermissionID;
    private _name: string;
    private _description: string;
    private _resource: string;
    private _action: 'read' | 'write' | 'update' | 'delete' | string;
    private _isActive: boolean;
    private _roleId?: number;
    private _module?: string;

    constructor(
        id: PermissionID,
        name: string,
        description: string,
        resource: string,
        action: 'read' | 'write' | 'update' | 'delete' | string,
        isActive: boolean,
        roleId?: number,
        module?: string
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._resource = resource;
        this._action = action;
        this._isActive = isActive;
        this._roleId = roleId;
        this._module = module;
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

    get resource(): string {
        return this._resource;
    }

    get action(): string {
        return this._action;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    get roleId(): number | undefined {
        return this._roleId;
    }

    get module(): string | undefined {
        return this._module;
    }
}
