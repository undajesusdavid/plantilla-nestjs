//src/shared/app/bus/event-bus.ts
import { Event } from './event';

export const EVENT_BUS = Symbol('EventBus');

export interface EventBus {
  publish(events: Event | Event[]): Promise<void>;
}