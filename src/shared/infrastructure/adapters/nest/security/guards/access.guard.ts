import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '@shared/infrastructure/adapters/nest/security/decorators/permissions.decorator';
import { QUERY_BUS, type QueryBus } from '@shared/app/bus/query-bus';
import { GetMyPermissionsQuery } from '@modules/users/app/get-my-permissions/get-my-permissions.query';
import { MyPermissionsResponse } from '@modules/users/app/get-my-permissions/get-my-permissions.use-case';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(QUERY_BUS) private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // Si los permisos no vienen en el token, los buscamos mediante el QueryBus
    let userPermissions: string[] = user.permissions;

    if (!userPermissions) {
      try {
        const permissionsData = await this.queryBus.execute<MyPermissionsResponse>(
          new GetMyPermissionsQuery(user.id)
        );
        userPermissions = permissionsData.permissions || [];
        
        // Guardamos los permisos en la request para que no se vuelvan a consultar en este mismo ciclo
        request.user.permissions = userPermissions;
      } catch (error) {
        throw new UnauthorizedException('No se pudieron verificar los permisos del usuario');
      }
    }

    if (userPermissions.includes('*:*')) {
      return true;
    }

    const hasPermission = userPermissions.some((permission: string) =>
      requiredPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new UnauthorizedException(
        `El usuario no posee el permiso requerido: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}


