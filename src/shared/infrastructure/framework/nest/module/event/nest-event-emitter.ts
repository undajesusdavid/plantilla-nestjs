import { EventEmitter2 } from "@nestjs/event-emitter";
import { Event as MyEvent } from "@src/shared/core/interfaces/events/event";
import { IEventEmitter } from "@src/shared/core/interfaces/events/event-emitter";


export class NestEventEmitter implements IEventEmitter {
    
    constructor(private readonly eventEmitter: EventEmitter2){}

    emit(event: MyEvent) {
        this.eventEmitter.emit(event.name, event.payload);
    };

} 