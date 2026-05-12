import { AppError } from '@shared/core/errors/app-error';

export class DuplicateUsernameError extends AppError {
  constructor(username: string) {
    super(
      `El Usuario " ${username} " ya existe`,
      'DUPLICATE_USERNAME',
    );
  }
}


