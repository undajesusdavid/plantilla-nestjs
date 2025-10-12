import { Table, Column, Model, DataType, Unique } from 'sequelize-typescript';

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  email: string;
  active: boolean;
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
    defaultValue: DataType.UUIDV4,
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

  @Column
  declare password: string;

  @Column
  declare active: boolean;
}
