import { Command } from '@shared/app/bus/command';

interface UpdateUserRolesProps {
  readonly id: string;
  readonly data: {
    readonly roles: string[];
  };
}

export class UpdateUserRolesCommand implements Command {
  constructor(public readonly props: UpdateUserRolesProps) {}
}


