import { AuthUserUseCase } from '@modules/users/app/auth-user/auth-user.use-case';
import { AuthUserCommand } from '@modules/users/app/auth-user/auth-user.command';
import { UserRepository } from '@modules/users/core/contracts/UserRepository';
import { AuthTokenService } from '@modules/users/core/contracts/AuthTokenService';
import { HashedService } from '@modules/users/core/contracts/HashedService';
import { User } from '@modules/users/core/entities/User';
import {
  UserNotFoundError,
  InvalidCredentialsError,
  UserInactiveError,
} from '@modules/users/app/errors';

// Generate a valid UUIDv7
function generateMockUUID(): string {
  // UUIDv7 format: xxxxxxxx-xxxx-7xxx-[89ab]xxx-xxxxxxxxxxxx
  const time_high = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
  const time_mid = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
  const time_low_and_version = (0x7000 | Math.floor(Math.random() * 0x0fff)).toString(16).padStart(4, '0');
  const clock_seq = (0x8000 | Math.floor(Math.random() * 0x3fff)).toString(16).padStart(4, '0');
  const node = Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0');
  
  return `${time_high}-${time_mid}-${time_low_and_version}-${clock_seq}-${node}`;
}

describe('AuthUserUseCase', () => {
  let useCase: AuthUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let authTokenService: jest.Mocked<AuthTokenService>;
  let hashedService: jest.Mocked<HashedService>;

  beforeEach(() => {
    // Mock the services
    userRepository = {
      findByUsername: jest.fn(),
    } as any;

    authTokenService = {
      auth: jest.fn().mockResolvedValue('fake-jwt-token'),
    } as any;

    hashedService = {
      compare: jest.fn(),
    } as any;

    useCase = new AuthUserUseCase(
      userRepository,
      authTokenService,
      hashedService,
    );
  });

  describe('internalExecute', () => {
    it('should authenticate user with valid credentials', async () => {
      // Arrange
      const mockUUID = generateMockUUID();
      const user = new User({
        id: mockUUID,
        username: 'john',
        password: 'hashed_password',
        email: 'john@example.com',
        active: true,
      });

      userRepository.findByUsername.mockResolvedValue(user);
      hashedService.compare.mockReturnValue(true);

      const command = new AuthUserCommand('john', 'password123');

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.token).toBe('fake-jwt-token');
      expect(result.id).toBe(mockUUID);
      expect(result.username).toBe('john');
      expect(userRepository.findByUsername).toHaveBeenCalledWith('john');
      expect(hashedService.compare).toHaveBeenCalledWith(
        'password123',
        'hashed_password',
      );
    });

    it('should throw UserNotFoundError if user not found', async () => {
      // Arrange
      userRepository.findByUsername.mockResolvedValue(null);
      const command = new AuthUserCommand('invalid', 'password');

      // Act & Assert
      await expect(useCase.execute(command)).rejects.toThrow(
        UserNotFoundError,
      );
    });

    it('should throw InvalidCredentialsError if password is wrong', async () => {
      // Arrange
      const mockUUID = generateMockUUID();
      const user = new User({
        id: mockUUID,
        username: 'john',
        password: 'hashed_password',
        email: 'john@example.com',
        active: true,
      });

      userRepository.findByUsername.mockResolvedValue(user);
      hashedService.compare.mockReturnValue(false);

      const command = new AuthUserCommand('john', 'wrongpassword');

      // Act & Assert
      await expect(useCase.execute(command)).rejects.toThrow(
        InvalidCredentialsError,
      );
    });

    it('should throw UserInactiveError if user is not active', async () => {
      // Arrange
      const mockUUID = generateMockUUID();
      const user = new User({
        id: mockUUID,
        username: 'john',
        password: 'hashed_password',
        email: 'john@example.com',
        active: false, // ← Inactive
      });

      userRepository.findByUsername.mockResolvedValue(user);

      const command = new AuthUserCommand('john', 'password123');

      // Act & Assert
      await expect(useCase.execute(command)).rejects.toThrow(
        UserInactiveError,
      );
    });
  });
});


