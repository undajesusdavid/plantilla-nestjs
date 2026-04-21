import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from '@shared/infrastructure/persistence/seeding/seeder.interface';
import { USER_REPOSITORY } from '@modules/users/core/contracts/UserRepository';
import type { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { HASHED_SERVICE } from '@modules/users/core/contracts/HashedService';
import type { HashedService } from '@modules/users/core/contracts/HashedService';
import { USERS } from '@modules/users/core/seeds/User.seeds';
import { User } from '@modules/users/core/entities/User';
import { ROLE_REPOSITORY } from '@modules/roles/core/contracts/RoleRepository';
import type { RoleRepository } from '@modules/roles/core/contracts/RoleRepository';
import { UUID_SERVICE } from '@shared/core/interfaces/uuid-service.interface';
import type { IUuidService } from '@shared/core/interfaces/uuid-service.interface';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(HASHED_SERVICE)
    private readonly hashedService: HashedService,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
    @Inject(UUID_SERVICE)
    private readonly uuidService: IUuidService,
  ) { }

  async run(): Promise<void> {
    const users = Object.values(USERS);

    for (const u of users) {
      const existing = await this.userRepository.findByUsername(u.username);
      if (!existing) {

        const user = new User({
          id: this.uuidService.generateUUID(),
          username: u.username,
          email: u.email,
          password: this.hashedService.hashed(u.password),
          active: u.active
        });
        await this.userRepository.save(user);

        // Buscamos el ID del rol por su nombre
        const role = await this.roleRepository.findByName(u.role);
        if (!role) {
          throw new Error(`Rol ${u.role} no encontrado para el usuario ${u.username}`);
        }
        await this.userRepository.assingRoles(user.getId(), [role.getId()])
      }
    }
  }
}


