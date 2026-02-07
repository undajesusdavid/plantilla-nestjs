
// src/infrastructure/persistence/sequelize/base-repository.ts
import { transactionStorage } from './transaction-context';

export abstract class BaseRepository {
    /**
     * Este método es la clave: extrae la transacción si existe, 
     * de lo contrario devuelve undefined (Sequelize funcionará normal)
     */
    protected get transaction() {
        return transactionStorage.getStore();
    }
}