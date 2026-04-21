import { Inject, Injectable } from '@nestjs/common';
import { Seeder } from '@shared/infrastructure/persistence/seeding/seeder.interface';
import { PERMISSION_REPOSITORY } from '@modules/permissions/core/contracts/PermissionRepository';
import type { PermissionRepository } from '@modules/permissions/core/contracts/PermissionRepository';
import { PERMISSIONS } from '@modules/permissions/core/seeds/Permission.seeds';
import { Permission } from '@modules/permissions/core/entities/Permission';

@Injectable()
export class PermissionSeeder implements Seeder {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async run(): Promise<void> {
    const permissions = Object.values(PERMISSIONS);
    let count = 1;

    for (const p of permissions) {
      const existing = await this.permissionRepository.findByName(p.name);
      if (!existing) {
        const permission = new Permission({
          id: count++,
          name: p.name,
          description: p.description,
          isActive: true,
        });
        await this.permissionRepository.save(permission);
      }
    }
  }
}


