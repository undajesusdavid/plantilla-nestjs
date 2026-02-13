
import {MapperService} from "src/shared/infrastructure/mappers/MapperService";
import { User } from "src/users/core/entities/User";
import { SequelizeUserModel } from "./user.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SequelizeUserMapper extends MapperService< User, SequelizeUserModel> {

    toDomain(model: SequelizeUserModel): User {

        const roles = model.roles ? model.roles.map(r => r.name) : [];
        const permissions = model.roles ? model.roles.flatMap(r => r.permissions.map(perm => perm.name)) : [];

        const user = new User({
            id: model.getDataValue('id'),
            username: model.getDataValue('username'),
            password: model.getDataValue('password'),
            email: model.getDataValue('email'),
            active: model.getDataValue('active'),
            roles: roles,
            permissions: permissions,
        });
        return user;
    }

    toPersistence(entity: User): SequelizeUserModel {
        const model = SequelizeUserModel.build({
            id: entity.getId().toString(),
            username: entity.getUsername(),
            password: entity.getPassword(),
            email: entity.getEmail(),
            active: entity.isActive()       
        });
        return model;
    }
}