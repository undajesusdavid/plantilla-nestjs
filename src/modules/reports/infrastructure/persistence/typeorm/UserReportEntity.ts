import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('usuarios')
export class UserReportEntity {
  
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  active!: boolean;
}


