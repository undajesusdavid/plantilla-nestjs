import { Uuid } from "src/shared/core/Uuid";

export class PermissionID extends Uuid{

    constructor(id : string){
        super(id);
    }

}