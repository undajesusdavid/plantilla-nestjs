import { AppError } from '@shared/core/errors/app-error';

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(
      'Nombre de usuario o contraseña inválidos',
      'INVALID_CREDENTIALS',
    );
  }
}


