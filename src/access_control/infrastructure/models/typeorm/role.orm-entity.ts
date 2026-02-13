// src/modules/auth/infrastructure/persistence/entities/role.orm-entity.ts
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { PermissionOrmEntity } from './permission.orm-entity';
import { UserOrmEntity } from '../../../../users/infrastructure/models/typeorm/user.orm-entity';

@Entity('ac_roles')
export class RoleOrmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column({ default: true })
    isActive: boolean;

    /**
     * Relación Muchos a Muchos con Permisos
     * @JoinTable define la tabla pivote 'ac_role_permissions'
     */
    @ManyToMany(() => PermissionOrmEntity, (permission) => permission.roles)
    @JoinTable({
        name: 'ac_role_permissions',
        joinColumn: { name: 'roleId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' }
    })
    permissions: PermissionOrmEntity[];

    /**
     * Relación Muchos a Muchos con Usuarios
     * Aquí NO usamos @JoinTable porque la definiremos en la entidad User
     * para mantener el control de los roles desde el usuario.
     */
    @ManyToMany(() => UserOrmEntity, (user) => user.roles)
    users: UserOrmEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}