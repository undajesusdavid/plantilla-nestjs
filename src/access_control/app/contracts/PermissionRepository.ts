import { PermissionID } from "src/access_control/core/PermissionId";
import { PermissionModel } from "src/access_control/structure/permission.sequealize";

export interface PermissionRepository {
    getAll(): Promise<PermissionModel[]>;
    getOneById(id: PermissionID): Promise<PermissionModel | null>;
    getOneByName(name: string): Promise<PermissionModel | null>;
    changePermissionStatus(id: PermissionID, status: boolean): Promise<boolean>;
    seedPermissions(): Promise<void>;
}

export const PermissionRepositoryToken = Symbol("PermissionRepository");