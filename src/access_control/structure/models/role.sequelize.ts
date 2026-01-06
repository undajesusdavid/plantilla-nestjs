import { AutoIncrement, Model } from "sequelize-typescript";
import { BelongsToMany, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import { PermissionModel } from './permission.sequelize';
import { UserModel } from "src/users/structure/models/user.sequelize";
import { UserRoleModel } from "src/users/structure/models/user_roles.sequelize";
import { RolePermissionModel } from "./role_permission.sequelize";

@Table({ tableName: 'ac_roles' })
export class RoleModel extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  declare id: number;

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