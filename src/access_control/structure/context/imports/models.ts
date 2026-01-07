//Models
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel } from '../../models/role.sequelize';
import { PermissionModel } from '../../models/permission.sequelize';
import { RolePermissionModel } from '../../models/role_permission.sequelize';

export const Models = SequelizeModule.forFeature([
    RoleModel, 
    PermissionModel,
    RolePermissionModel
]);