export class TransactionWrapper{
   // Constructor privado: nadie puede hacer 'new TransactionWrapper()' fuera de aquí
    private constructor(public readonly value: unknown) {}

   static create(connection: unknown): TransactionWrapper {
        return new TransactionWrapper(connection);
    }

    /**
     * Crea un wrapper vacío (sin transacción).
     * Úsalo en los Casos de Uso cuando no necesites atomicidad.
     */
    static none(): TransactionWrapper {
        return new TransactionWrapper(null);
    }
}