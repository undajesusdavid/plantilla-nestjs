

export class PermissionID {
    
    constructor(private value : number){}

    static create(newValue : number): PermissionID {
        return new PermissionID(newValue);
    }

    toString(): number{
        return this.value;
    }
}