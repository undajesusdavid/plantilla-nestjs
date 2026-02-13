
import {MapperService} from "src/shared/infrastructure/mappers/MapperService";
import { Role } from "../../core/role/Role";
import { RoleModelAttributes } from "../models/sequelize/role.sequelize";

export class RoleMapper extends MapperService<Role, RoleModelAttributes> {

    toDomain(model: RoleModelAttributes): Role {
        
        const role = Role.restore({
            id: model.id,
            name: model.name,
            description: model.description,
            isActive: model.isActive,
            permissions: model.permissions || []
        });
        
        return role;
    }

    toPersistence(entity: Role): RoleModelAttributes {
        const model = ({
            id: entity.getId(),
            name: entity.getName(),
            description: entity.getDescription(),
            isActive: entity.getIsActive(),
            permissions: entity.getPermissions(),
        });
        return model;
    }
}