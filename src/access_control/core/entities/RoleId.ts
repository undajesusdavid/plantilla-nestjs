import { Uuid } from "src/shared/core/Uuid";

export class RoleID extends Uuid{
    constructor(id : string){
        super(id);
    }
}