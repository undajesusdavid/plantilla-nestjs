import { MapperService } from "src/shared/infrastructure/mappers/MapperService";
import { Permission } from "src/access_control/core/permission/Permission";
import { TypeormPermissionModel } from "./permission.model";

export class TypeormPermissionMapper extends MapperService<Permission, TypeormPermissionModel > {

    toDomain(model: TypeormPermissionModel): Permission {

        return new Permission({
            id: model.id,
            name: model.name,
            description: model.description,
            isActive: model.isActive
        });
    }

    toPersistence(entity: Permission): TypeormPermissionModel {
        const model = new TypeormPermissionModel();
        model.id = entity.getId();
        model.name = entity.getName();
        model.description = entity.getDescription();
        model.isActive = entity.getIsActive();

        return model;
    }
}