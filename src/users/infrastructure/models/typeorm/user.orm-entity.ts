// src/modules/users/infrastructure/persistence/entities/user.orm-entity.ts
import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { RoleOrmEntity } from '../../../../access_control/infrastructure/models/typeorm/role.orm-entity';

@Entity('usuarios')
export class UserOrmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false }) // Seguridad: No devuelve el password por defecto en las consultas
    password: string;

    @Column({ default: true })
    active: boolean;

    /**
     * Relación Muchos a Muchos con Roles
     * Definimos @JoinTable aquí para que al guardar un usuario 
     * podamos persistir sus roles fácilmente.
     */
    @ManyToMany(() => RoleOrmEntity, (role) => role.users)
    @JoinTable({
        name: 'user_roles', // Nombre de la tabla intermedia
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
    })
    roles: RoleOrmEntity[];

    // Si decides usar timestamps en el futuro, solo descomenta:
    // @CreateDateColumn()
    // createdAt: Date;
}