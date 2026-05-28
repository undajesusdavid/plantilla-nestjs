import { AppError } from '@shared/core/errors/app-error';

export class InsufficientPermissionsError extends AppError {
  constructor() {
    super(
      'El usuario no posee permisos para poder acceder al sistema',
      'INSUFFICIENT_PERMISSIONS',
    );
  }
}


