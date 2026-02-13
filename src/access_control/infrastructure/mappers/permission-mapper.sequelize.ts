
import { MapperService } from "src/shared/infrastructure/mappers/MapperService";
import { Permission } from "src/access_control/core/permission/Permission";
import { PermissionModelAttributes } from "../models/sequelize/permission.sequelize";


export class PermissionMapper extends MapperService<Permission, PermissionModelAttributes> {

    toDomain(model: PermissionModelAttributes): Permission {

        const entity = new Permission({
            id: model.id, // Asignar un valor predeterminado si id es undefined
            name: model.name,
            description: model.description,
            isActive: model.isActive
        });
        return entity;
    }

    toPersistence(entity: Permission): PermissionModelAttributes {
        const model = {
            id: entity.getId(),
            name: entity.getName(),
            description: entity.getDescription(),
            isActive: entity.getIsActive()
        };
        
        return model;
    }
}