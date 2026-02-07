import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * Guardará la instancia de la transacción del ORM que estés usando
 * (Transaction de Sequelize, EntityManager de TypeORM, Client de Prisma, etc.)
 */
export const transactionStorage = new AsyncLocalStorage<any>();