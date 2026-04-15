import { BaseUseCase } from 'src/shared/app/use-cases/base.use-case';
import { CreateUserCommand } from './create-user.command';
import { User } from 'src/users/core/entities/User';
import type { UserRepository } from 'src/users/core/contracts/UserRepository';
import type { IUuidService } from 'src/shared/core/interfaces/uuid-service.interface';
import type { HashedService } from 'src/users/core/contracts/HashedService';
import { DuplicateUsernameError, DuplicateEmailError } from '../errors';

export class CreateUserUseCase extends BaseUseCase<CreateUserCommand, User> {
  static readonly HANDLED_COMMAND = CreateUserCommand;

  constructor(
    private userRepo: UserRepository,
    private uuidService: IUuidService,
    private hashedService: HashedService,
  ) {
    super();
  }

  async internalExecute(command: CreateUserCommand): Promise<User> {
    const { username, password, email } = command;

    const usernameExists = await this.userRepo.usernameExists(username);
    if (usernameExists) {
      throw new DuplicateUsernameError(username);
    }

    const emailExists = await this.userRepo.emailExists(email);
    if (emailExists) {
      throw new DuplicateEmailError(email);
    }

    const id = this.uuidService.generateUUID();

    const user = new User({
      id: id,
      username: username,
      password: this.hashedService.hashed(password),
      email: email,
      active: true, // aca debo agregar una opcion de configuracion futura
    });

    const created = await this.userRepo.create(user);
    if (!created) {
      throw new Error('El usuario no pudo ser registrado');
    }

    return user;
  }
}
