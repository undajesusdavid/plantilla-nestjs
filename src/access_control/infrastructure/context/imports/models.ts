//Models
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from '../../models/sequelize/role.sequelize';
import { PermissionModel } from '../../models/sequelize/permission.sequelize';
import { RolePermissionModel } from '../../models/sequelize/role_permission.sequelize';

export const Models = SequelizeModule.forFeature([
    RoleModel, 
    PermissionModel,
    RolePermissionModel
]);