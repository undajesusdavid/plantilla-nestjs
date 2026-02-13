import { BaseUseCase } from "src/shared/app/use-cases/base.use-case";
import { User } from "src/users/core/entities/User";
import { UserRepository } from "../../core/contracts/UserRepository";
import { NotFoundError } from "src/shared/core/errors/app-error";

export const GETUSER_USERCASE = Symbol("GetUserUseCase");

export class GetUserUseCase extends BaseUseCase<string, User> {
    constructor(private readonly userRepository: UserRepository) {
        super();
    }

    protected async internalExecute(userId: string): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError("User", userId);
        }
        return user;
    }
}