import { Event } from "./event";

export const EVENT_EMITTER = Symbol('IEventEmitter');

export interface IEventEmitter {
  emit: (event : Event) => void;
}


