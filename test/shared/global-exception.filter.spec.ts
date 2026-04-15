import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { GlobalExceptionFilter } from 'src/shared/infrastructure/adapters/nest/filters/global-exception.filter';
import { AppError } from 'src/shared/core/errors/app-error';
import { InvalidCredentialsError } from 'src/users/app/errors';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: jest.Mocked<Response>;
  let mockArgumentsHost: jest.Mocked<ArgumentsHost>;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    } as any;
  });

  describe('catch', () => {
    it('should handle AppError correctly', () => {
      // Arrange
      const error = new InvalidCredentialsError();

      // Act
      filter.catch(error, mockArgumentsHost);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.objectContaining({
            code: 'INVALID_CREDENTIALS',
            message: 'Nombre de usuario o contraseña inválidos',
          }),
        }),
      );
    });

    it('should handle generic errors with 500 status', () => {
      // Arrange
      const error = new Error('Something went wrong');

      // Act
      filter.catch(error, mockArgumentsHost);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    it('should include timestamp in response', () => {
      // Arrange
      const error = new InvalidCredentialsError();

      // Act
      filter.catch(error, mockArgumentsHost);

      // Assert
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            timestamp: expect.any(String),
          }),
        }),
      );
    });
  });
});
