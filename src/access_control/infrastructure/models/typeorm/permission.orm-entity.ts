// src/modules/auth/infrastructure/persistence/entities/permission.orm-entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from 'typeorm';
import { RoleOrmEntity } from './role.orm-entity';

@Entity('ac_permisos')
export class PermissionOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column({ default: true })
    isActive: boolean;

    // Relación Muchos a Muchos con Roles
    // El primer parámetro apunta a la entidad destino
    // El segundo parámetro define la propiedad inversa en la otra entidad
    @ManyToMany(() => RoleOrmEntity, (role) => role.permissions)
    roles: RoleOrmEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}