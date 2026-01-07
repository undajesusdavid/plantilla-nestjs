
import {MapperService} from "src/shared/app/contracts/MapperService";
import { Role } from "src/access_control/core/entities/Role";
import { RoleModel } from "../models/role.sequelize";
import { RoleID } from "src/access_control/core/entities/RoleId";

export class RoleMapper extends MapperService<RoleModel, Role> {

    toEntity(model: RoleModel): Role {
        
        const role = new Role({
            id: new RoleID(model.getDataValue('id')),
            name: model.getDataValue('name'),
            description: model.getDataValue('description'),
            isActive: model.getDataValue('isActive')
        });
        return role;
    }

    toModel(entity: Role): RoleModel {
        const model = RoleModel.build({
            id: entity.getId().toString(),
            name: entity.getName(),
            description: entity.getDescription(),
            isActive: entity.getIsActive()
        });
        return model;
    }
}