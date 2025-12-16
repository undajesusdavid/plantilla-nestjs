import { AutoIncrement, Model } from "sequelize-typescript";
import { BelongsToMany, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import { PermissionModel } from './permission.sequelize';

@Table({ tableName: 'roles' })
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

  @BelongsToMany(() => PermissionModel, 'role_permissions', 'roleId', 'permissionId')
  permissions: PermissionModel[];
}