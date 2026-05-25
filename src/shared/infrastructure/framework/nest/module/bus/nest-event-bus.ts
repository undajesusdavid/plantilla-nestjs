// src/shared/infrastructure/framework/nest/module/bus/nest-event-bus.ts
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from '@src/shared/app/bus/event';
import { EventBus } from '@src/shared/app/bus/event-bus';

@Injectable()
export class NestEventBus implements EventBus {
  // Inyectamos el EventEmitter2 nativo de NestJS
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish(events: Event | Event[]): Promise<void> {
    // Si nos llega un solo evento, lo normalizamos dentro de un arreglo
    const eventsArray = Array.isArray(events) ? events : [events];

    // Procesamos y emitimos cada evento
    for (const event of eventsArray) {
      const eventName = this.getEventName(event);
      
      // Emitimos el evento de forma asíncrona en el bus de NestJS
      this.eventEmitter.emit(eventName, event);
    }
  }

  /**
   * Transforma automáticamente el nombre de la clase a un string estándar.
   * Ejemplo: "AuthUserEvent" -> "auth-user" o "auth.user"
   */
  private getEventName(event: Event): string {
    return event.constructor.name
      .replace(/Event$/, '') // Quita la palabra "Event" del final si la tiene
      .replace(/([a-z])([A-Z])/g, '$1-$2') // Convierte CamelCase a kebab-case
      .toLowerCase();
  }
}