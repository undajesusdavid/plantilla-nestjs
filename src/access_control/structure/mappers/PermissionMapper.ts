
import { MapperService } from "src/shared/structure/mappers/MapperService";
import { Permission } from "src/access_control/core/permission/Permission";
import { PermissionModel } from "../models/permission.sequelize";
import { PermissionID } from "src/access_control/core/permission/PermissionId";

export class PermissionMapper extends MapperService<PermissionModel, Permission> {

    toEntity(model: PermissionModel): Permission {

        const entity = new Permission({
            id: model.id,
            name: model.name,
            description: model.description,
            isActive: model.isActive
        });
        return entity;
    }

    toModel(entity: Permission): PermissionModel {
        const model = PermissionModel.build({
            id: entity.getId(),
            name: entity.getName(),
            description: entity.getDescription(),
            isActive: entity.getIsActive()
        });
        return model;
    }
}