import { Command } from '@shared/app/bus/command';

export class AuthUserCommand implements Command {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}


