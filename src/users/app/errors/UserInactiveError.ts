import { AppError } from 'src/shared/core/errors/app-error';

export class UserInactiveError extends AppError {
  constructor(userId: string) {
    super(
      `Usuario ${userId} está inactivo`,
      'USER_INACTIVE',
    );
  }
}
