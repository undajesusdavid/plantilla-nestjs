// src/access_control/infrastructure/persistence/typeorm/mappers/permission.typeorm.mapper.ts
import { MapperService } from "src/shared/infrastructure/mappers/MapperService";
import { Permission } from "src/access_control/core/permission/Permission";
import { PermissionOrmEntity } from "../models/typeorm/permission.orm-entity";

export class PermissionTypeOrmMapper extends MapperService<Permission, PermissionOrmEntity > {

    toDomain(model: PermissionOrmEntity): Permission {

        return new Permission({
            id: model.id,
            name: model.name,
            description: model.description,
            isActive: model.isActive
        });
    }

    toPersistence(entity: Permission): PermissionOrmEntity {
        const model = new PermissionOrmEntity();
        model.id = entity.getId();
        model.name = entity.getName();
        model.description = entity.getDescription();
        model.isActive = entity.getIsActive();

        return model;
    }
}