
import { Event } from '@shared/app/bus/event';

export class AuthUserEvent implements Event {
  readonly eventId: string;
  readonly occurredAt: Date;

  constructor(
    public readonly userId: string,
    public readonly username: string
  ) {
    // Generamos la metadata obligatoria del contrato global
    this.eventId = crypto.randomUUID(); 
    this.occurredAt = new Date();
  }

  // Cumplimos con el aggregateId opcional apuntando al recurso principal (el usuario)
  get aggregateId(): string {
    return this.userId;
  }
}