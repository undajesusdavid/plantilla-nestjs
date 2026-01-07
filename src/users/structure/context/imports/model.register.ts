//Models
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../../models/user.sequelize';
import { UserRoleModel } from '../../models/user_roles.sequelize';

export const Models = SequelizeModule.forFeature([
    UserModel, 
    UserRoleModel
]);