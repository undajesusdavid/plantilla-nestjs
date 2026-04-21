import { AuthTokenService } from '@modules/users/core/contracts/AuthTokenService';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { ErrorAuthTokenService } from '@modules/users/app/errors/ErrorAuthTokenService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthTokenServiceImp implements AuthTokenService {
  private readonly secret: string;
  private readonly expiresIn: string | number;

  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length === 0) {
      throw new Error(
        'JWT_SECRET must be configured in environment variables. ' +
        'Please set JWT_SECRET in your .env file with a secure random string of at least 32 characters.'
      );
    }
    this.secret = secret;
    this.expiresIn = process.env.JWT_EXPIRES_IN || '24h';
  }

  async auth(payload: any): Promise<string> {
    try {
      const options: SignOptions = {
        expiresIn: this.expiresIn as any,
        algorithm: 'HS256',
      };
      const token = jwt.sign(payload, this.secret, options);

      return token;
    } catch (error) {
      throw new ErrorAuthTokenService(
        'Error al intentar crear el token de la session',
        'SIGN_TOKEN_FAILED',
        { originalError: error, class: this.constructor.name, method: 'auth' },
      );
    }
  }

  async verify(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded;
    } catch (error) {
      throw new ErrorAuthTokenService(
        'Error al intentar verificar el token',
        'VERIFY_TOKEN_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'verify',
        },
      );
    }
  }
}


