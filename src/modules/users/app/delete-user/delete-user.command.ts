import { Command } from '@shared/app/bus/command';

export class DeleteUserCommand implements Command {
  constructor(public props: { id: string }) {}
}


