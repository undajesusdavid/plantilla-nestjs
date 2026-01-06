
import {MapperService} from "src/shared/app/contracts/MapperService";
import { User } from "src/users/core/User";
import { UserModel } from "../models/user.sequelize";
import { UserID } from "src/users/core/UserID";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMapper extends MapperService<UserModel, User> {

    toEntity(model: UserModel): User {

        const roles = model.roles ? model.roles.map(r => r.name) : [];
        const permissions = model.roles ? model.roles.flatMap(r => r.permissions.map(perm => perm.name)) : [];

        const user = new User({
            id: new UserID(model.getDataValue('id')),
            username: model.getDataValue('username'),
            password: model.getDataValue('password'),
            email: model.getDataValue('email'),
            active: model.getDataValue('active'),
            roles: roles,
            permissions: permissions,
        });
        return user;
    }

    toModel(entity: User): UserModel {
        const model = UserModel.build({
            id: entity.getId().toString(),
            username: entity.getUsername(),
            password: entity.getPassword(),
            email: entity.getEmail(),
            active: entity.isActive()       
        });
        return model;
    }
}