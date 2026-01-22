// src/infrastructure/database/sequelize-unit-of-work.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { TransactionManager } from 'src/database/core/contracts/TransactionManager';

@Injectable()
export class SequelizeTransaction implements TransactionManager {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async run<T>(work: () => Promise<T>): Promise<T> {
    // Sequelize gestiona la propagación de la transacción automáticamente 
    // si usas CLS o si pasas explícitamente el objeto transaction.
    return this.sequelize.transaction(async (t) => {
      return await work();
    });
  }
}