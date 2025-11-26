import { Model } from "sequelize-typescript";
import { BelongsToMany, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import { PermissionModel } from './permission.sequealize';

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel> {
  @PrimaryKey
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @BelongsToMany(() => PermissionModel, 'role_permissions', 'roleId', 'permissionId')
  permissions: PermissionModel[];
}