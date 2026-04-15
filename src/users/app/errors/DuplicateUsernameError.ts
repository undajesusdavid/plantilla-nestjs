import { AppError } from 'src/shared/core/errors/app-error';

export class DuplicateUsernameError extends AppError {
  constructor(username: string) {
    super(
      `Usuario "${username}" ya existe`,
      'DUPLICATE_USERNAME',
    );
  }
}
