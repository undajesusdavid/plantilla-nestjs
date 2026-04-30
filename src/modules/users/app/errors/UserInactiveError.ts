import { AppError } from '@shared/core/errors/app-error';

export class UserInactiveError extends AppError {
  constructor(username: string) {
    super(
      `El usuario "${username}" se encuentra inactivo`,
      'USER_INACTIVE',
    );
  }
}


