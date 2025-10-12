export class DtoPayloadResponse {
    constructor(
        private readonly token: string,
        private readonly id: string,
        private readonly username: string
        
    ) {}

}