import { Uuid } from "src/shared/core/entities/Uuid";

export class UserID extends Uuid {

    constructor(id: string){
        super(id);
    }

}