import { Table, Column, Model, DataType, Unique, BelongsToMany } from 'sequelize-typescript';
import { RoleModel } from 'src/access_control/infrastructure/models/role.sequelize';
import { UserRoleModel } from './user_roles.sequelize';

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  email: string;
  active: boolean;
  roles?: RoleModel[];
}

@Table({
  createdAt: false,
  updatedAt: false,
  tableName: "usuarios"
  // opcional, si no usas createdAt/updatedAt
})
export class UserModel extends Model<UserAttributes> implements UserAttributes {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare username: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  declare active: boolean;

  @BelongsToMany(() => RoleModel, () => UserRoleModel) 
  declare roles: RoleModel[];

}
