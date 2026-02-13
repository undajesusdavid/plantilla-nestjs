//Models
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../../models/sequelize/user.sequelize';
import { UserRoleModel } from '../../models/sequelize/user_roles.sequelize';

export const Models = SequelizeModule.forFeature([
    UserModel, 
    UserRoleModel
]);