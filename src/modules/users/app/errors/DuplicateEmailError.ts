import { AppError } from '@shared/core/errors/app-error';

export class DuplicateEmailError extends AppError {
  constructor(email: string) {
    super(
      `Email "${email}" ya está registrado`,
      'DUPLICATE_EMAIL',
    );
  }
}


