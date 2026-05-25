//src/shared/app/bus/event.ts
export interface Event {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly aggregateId?: string; // Opcional, útil para DDD
}


