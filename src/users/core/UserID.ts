import { Uuid } from "src/shared/core/Uuid";

export class UserID extends Uuid {

    constructor(id: string){
        super(id);
    }

}