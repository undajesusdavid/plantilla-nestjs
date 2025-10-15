import { InjectModel } from "@nestjs/sequelize";
import { PermissionModel } from "../permission.sequealize";
import { PermissionRepository } from "src/permissions/app/contracts/PermissionRepository";

export class PermissionRepositoryImp implements PermissionRepository {
    constructor(
        @InjectModel(PermissionModel) private permissionModel: typeof PermissionModel
    ) {

    }
} 