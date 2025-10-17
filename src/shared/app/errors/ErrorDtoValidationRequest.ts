export class ErrorDtoValidationRequest extends Error {
    public readonly code: string;
    public readonly context?: any;
    public readonly errorMessages : string[];

    constructor(errorMessages: string[], code: string = 'DTO_ERROR_VALIDATION', context?: any) {
        super(errorMessages[0]); // Esto asigna el mensaje al error base
        this.name = this.constructor.name;
        this.code = code;
        this.context = context;

        // Mantiene el stack trace correcto
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorDtoValidationRequest);
        }
    }
}
