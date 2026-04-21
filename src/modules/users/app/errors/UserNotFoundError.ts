import { AppError } from '@shared/core/errors/app-error';

export class UserNotFoundError extends AppError {
  constructor(identifier: string) {
    super(
      `Usuario con identificador "${identifier}" no encontrado`,
      'USER_NOT_FOUND',
    );
  }
}


