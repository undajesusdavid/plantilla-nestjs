export class RolePermissionsL {

    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly description: string,
        private readonly isActive: boolean,
    ) { }


    getValue() {

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
        }
    }

}