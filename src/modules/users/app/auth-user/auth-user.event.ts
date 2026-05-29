import { Event } from "@src/shared/core/interfaces/events/event";

export class AuthUserEvent implements Event {

    name = 'auth-user';
   
    payload: {
        userId: string,
        username: string,
        occurredAt: Date;
    }

    constructor(userId: string, username: string) {
        this.payload = {
            userId,
            username,
            occurredAt: new Date()
        };
        
    }
} 