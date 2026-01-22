import { Uuid } from "src/shared/core/entities/Uuid";

export class RoleID extends Uuid{
    constructor(id : string){
        super(id);
    }
}