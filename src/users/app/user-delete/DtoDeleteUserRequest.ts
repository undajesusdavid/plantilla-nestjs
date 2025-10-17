import { ErrorDtoValidationRequest } from "src/shared/app/errors/ErrorDtoValidationRequest";

export interface PropsDeleteUserRequest {
    id: string
}

export class DtoDeleteUserRequest {
    public readonly id: string;

    constructor(props: PropsDeleteUserRequest){
        this.id = props.id;
    }

    static create(props: DtoDeleteUserRequest){
        const errors : string[] = [];
        if(typeof props.id !== 'string'){
            errors.push("El ID es requerido");
        }

        if(errors.length > 0){
            throw new ErrorDtoValidationRequest(errors);
        }

        return new DtoDeleteUserRequest(props);
    }
}