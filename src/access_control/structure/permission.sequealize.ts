// permission.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    BelongsToMany,
    AutoIncrement,
} from 'sequelize-typescript';

import { RoleModel } from './role.sequealize';

@Table({
    tableName: 'permissions',
    timestamps: true,
})
export class PermissionModel extends Model {
    @PrimaryKey 
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    declare id: number;

    @AllowNull(false)
    @Column({ type: DataType.STRING, unique: true })
    declare name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;

    @AllowNull(false)
    @Default(true)
    @Column(DataType.BOOLEAN)
    declare isActive: boolean;

    @BelongsToMany(() => RoleModel, 'role_permissions', 'permissionId', 'roleId')
    roles: RoleModel[];


}
