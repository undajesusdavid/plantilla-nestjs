import { CreateUserUseCase } from 'src/users/app/create-user/create-user.use-case';
import { CreateUserCommand } from 'src/users/app/create-user/create-user.command';
import { UserRepository } from 'src/users/core/contracts/UserRepository';
import { IUuidService } from 'src/shared/core/interfaces/uuid-service.interface';
import { HashedService } from 'src/users/core/contracts/HashedService';
import {
  DuplicateUsernameError,
  DuplicateEmailError,
} from 'src/users/app/errors';

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

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let uuidService: jest.Mocked<IUuidService>;
  let hashedService: jest.Mocked<HashedService>;
  let mockUUID: string;

  beforeEach(() => {
    mockUUID = generateMockUUID();

    userRepository = {
      usernameExists: jest.fn().mockResolvedValue(false),
      emailExists: jest.fn().mockResolvedValue(false),
      create: jest.fn().mockResolvedValue(true),
    } as any;

    uuidService = {
      generateUUID: jest.fn().mockReturnValue(mockUUID),
    } as any;

    hashedService = {
      hashed: jest.fn().mockReturnValue('hashed_password'),
    } as any;

    useCase = new CreateUserUseCase(
      userRepository,
      uuidService,
      hashedService,
    );
  });

  describe('internalExecute', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const command = new CreateUserCommand(
        'john',
        'password123',
        'john@example.com',
      );

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.getUsername()).toBe('john');
      expect(result.getEmail()).toBe('john@example.com');
      expect(result.isActive()).toBe(true);
      expect(userRepository.usernameExists).toHaveBeenCalledWith('john');
      expect(userRepository.emailExists).toHaveBeenCalledWith('john@example.com');
      expect(userRepository.create).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should throw DuplicateUsernameError if username exists', async () => {
      // Arrange
      userRepository.usernameExists.mockResolvedValue(true);
      const command = new CreateUserCommand(
        'john',
        'password123',
        'john@example.com',
      );

      // Act & Assert
      await expect(useCase.execute(command)).rejects.toThrow(
        DuplicateUsernameError,
      );
    });

    it('should throw DuplicateEmailError if email exists', async () => {
      // Arrange
      userRepository.emailExists.mockResolvedValue(true);
      const command = new CreateUserCommand(
        'john',
        'password123',
        'john@example.com',
      );

      // Act & Assert
      await expect(useCase.execute(command)).rejects.toThrow(
        DuplicateEmailError,
      );
    });

    it('should hash password using hashedService', async () => {
      // Arrange
      const command = new CreateUserCommand(
        'john',
        'password123',
        'john@example.com',
      );

      // Act
      await useCase.execute(command);

      // Assert
      expect(hashedService.hashed).toHaveBeenCalledWith('password123');
    });

    it('should generate UUID for new user', async () => {
      // Arrange
      const command = new CreateUserCommand(
        'john',
        'password123',
        'john@example.com',
      );

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(uuidService.generateUUID).toHaveBeenCalled();
      expect(result.getId()).toBe(mockUUID);
    });
  });
});
