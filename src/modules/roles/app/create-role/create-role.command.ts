import { Command } from '@shared/app/bus/command';

export class CreateRoleCommand implements Command {
  constructor(
    public readonly props: {
      name: string;
      description?: string;
      permissions: number[];
    },
  ) {}
}


