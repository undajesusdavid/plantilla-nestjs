import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { UserModel } from "./user.sequelize";
import { RoleModel } from "../../../access_control/structure/models/role.sequelize";

@Table({ tableName: "user_roles" })
export class UserRoleModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID })
  declare userId: string;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER })
  declare roleId: number;
}
