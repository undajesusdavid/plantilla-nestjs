// permission.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
} from 'sequelize-typescript';

@Table({
    tableName: 'Permissions',
    timestamps: true,
})
export class PermissionModel extends Model<PermissionModel> {
    @PrimaryKey
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare module: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare resource: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare action: string; // Puedes agregar validaciones si quieres restringir valores

    @AllowNull(false)
    @Default(true)
    @Column(DataType.BOOLEAN)
    declare isActive: boolean;



    
}
