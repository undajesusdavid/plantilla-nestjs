import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { RoleModel } from "./role.sequelize";
import { PermissionModel } from "./permission.sequelize";

@Table({ tableName: 'ac_role_permissions' })
export class RolePermissionModel extends Model {
  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare roleId: number;

  @ForeignKey(() => PermissionModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare permissionId: number;
}
