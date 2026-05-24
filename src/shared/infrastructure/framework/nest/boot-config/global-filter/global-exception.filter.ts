import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '@shared/core/errors/app-error';
import { ExceptionMappers, HandledError } from './exception-mappers';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { status, code, message, details } = this.resolveError(exception);

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
        timestamp: new Date().toISOString(),
      },
    });
  }

  private resolveError(exception: any): HandledError {
    // 1. Errores de Dominio / Aplicación
    if (exception instanceof AppError) {
      return ExceptionMappers.handleAppError(exception);
    }

    // 2. Errores específicos de Infraestructura de Base de Datos (TypeORM)
    if (exception.code === 'ER_DUP_ENTRY' || exception.message?.includes('duplicate')) {
      return ExceptionMappers.handleDuplicateEntry();
    }
    
    if (exception.code === 'ER_NO_REFERENCED_ROW' || exception.message?.includes('FOREIGN KEY constraint fails')) {
      return ExceptionMappers.handleForeignKeyError();
    }

    // 3. Errores nativos de HTTP del Framework (NestJS)
    if (typeof exception.getStatus === 'function') {
      return ExceptionMappers.handleNestHttpError(exception);
    }

    // 4. Fallback para errores genéricos o no controlados (Errores de sintaxis, caídas, etc.)
    return ExceptionMappers.handleDefault();
  }
}