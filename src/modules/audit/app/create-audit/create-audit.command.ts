import { Command } from '@shared/app/bus/command';

export class CreateAuditCommand implements Command {
  readonly name: string;

  constructor(props: { name: string }) {
    this.name = props.name;
  }
}
