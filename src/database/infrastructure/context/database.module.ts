
import { Module } from '@nestjs/common';
import { SequealizeModule } from '../sequelize/sequealize.module';

import { UNIT_OF_WORK } from 'src/shared/core/interfaces/unit-of-work.interface';
import { SequelizeUnitOfWork } from '../sequelize/sequealize-unit-of-work.service';


// Modulo de base de datos
@Module({
  imports: [
    SequealizeModule,
  ],

  providers: [
    {
      provide: UNIT_OF_WORK,
      useClass: SequelizeUnitOfWork,
    },
  ],

  exports: [UNIT_OF_WORK]
})
export class DatabaseModule { }