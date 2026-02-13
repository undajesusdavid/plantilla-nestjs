import { Model } from "sequelize-typescript";
import { BelongsToMany, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import { PermissionModel } from './permission.sequelize';
import { UserModel } from "src/users/infrastructure/models/sequelize/user.sequelize";
import { UserRoleModel } from "src/users/infrastructure/models/sequelize/user_roles.sequelize";
import { RolePermissionModel } from "./role_permission.sequelize";

export interface RoleModelAttributes {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  permissions?: number[];
  users?: string[];
}


@Table({ tableName: 'ac_roles' })
export class RoleModel extends Model<RoleModelAttributes> {

 @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare isActive: boolean;

  @BelongsToMany(() => PermissionModel, () => RolePermissionModel) 
  declare permissions: PermissionModel[];

  @BelongsToMany(() => UserModel, () => UserRoleModel) 
  declare users: UserModel[];
}