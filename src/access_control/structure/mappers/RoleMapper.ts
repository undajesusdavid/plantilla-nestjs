
import {MapperService} from "src/shared/structure/mappers/MapperService";
import { Role } from "../../core/role/Role";
import { RoleModel } from "../models/role.sequelize";

export class RoleMapper extends MapperService<RoleModel, Role> {

    toEntity(model: RoleModel): Role {
        
        const role = Role.restore({
            id: model.getDataValue('id'),
            name: model.getDataValue('name'),
            description: model.getDataValue('description'),
            isActive: model.getDataValue('isActive'),
            permissions: model.getDataValue('permissions') || []
        });
        
        return role;
    }

    toModel(entity: Role): RoleModel {
        const model = RoleModel.build({
            id: entity.getId(),
            name: entity.getName(),
            description: entity.getDescription(),
            isActive: entity.getIsActive()
        });
        return model;
    }
}