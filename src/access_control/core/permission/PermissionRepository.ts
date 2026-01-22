import { PermissionID } from "src/access_control/core/permission/PermissionId";
import { PermissionModel } from "src/access_control/structure/models/permission.sequelize";

export interface PermissionRepository {
    getAll(): Promise<PermissionModel[]>;
    getOneById(id: PermissionID): Promise<PermissionModel | null>;
    getOneByName(name: string): Promise<PermissionModel | null>;
    changePermissionStatus(id: PermissionID, status: boolean): Promise<boolean>;
    findExistingIds(ids: number[]): Promise<number[]>;
}

export const PermissionRepositoryToken = Symbol("PermissionRepository");