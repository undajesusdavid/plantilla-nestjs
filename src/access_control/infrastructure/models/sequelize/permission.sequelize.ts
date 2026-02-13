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

import { RoleModel } from './role.sequelize';
import { RolePermissionModel } from './role_permission.sequelize';

export interface PermissionModelAttributes {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}


@Table({
    tableName: 'ac_permisos',
    timestamps: true,
})
export class PermissionModel extends Model{
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

    @BelongsToMany(() => RoleModel, () => RolePermissionModel) roles: RoleModel[];

    // @BelongsToMany(() => RoleModel, 'ac_role_permissions', 'permissionId', 'roleId')
    // roles: RoleModel[];


}
