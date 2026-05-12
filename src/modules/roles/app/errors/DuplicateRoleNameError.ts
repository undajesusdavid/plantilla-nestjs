import { AppError } from '@shared/core/errors/app-error';

export class DuplicateRoleNameError extends AppError {
  constructor(rolName: string) {
    super(
      `El Rol con nombre: " ${rolName} " ya está registrado`,
      'DUPLICATE_ROLE_NAME',
    );
  }
}


