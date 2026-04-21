import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { CreateAuditCommand } from './create-audit.command';
import { Audit } from '@modules/audit/core/entities/Audit';

export class CreateAuditUseCase extends BaseUseCase<CreateAuditCommand, Audit> {
  static readonly HANDLED_COMMAND = CreateAuditCommand;

  constructor() {
    super();
  }

  protected async internalExecute(command: CreateAuditCommand): Promise<Audit> {
    console.log('Ejecutando creación de audit:', command.name);
    return new Audit({ id: 'new-id', name: command.name });
  }
}
