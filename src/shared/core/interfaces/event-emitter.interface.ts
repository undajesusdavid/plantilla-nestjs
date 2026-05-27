export const EVENT_EMITTER_SERVICE = Symbol('EventEmitterService');

export interface EventEmitterService {
    emit(): void;
  
}


