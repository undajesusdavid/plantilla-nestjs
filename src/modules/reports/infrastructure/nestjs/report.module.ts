import { Module } from '@nestjs/common';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReportEntity } from '../persistence/typeorm/UserReportEntity';
import { ReportsProvider } from './context/poviders/report.provider';
import { ReportPersistenceProvider } from './context/poviders/persistence.provider';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserReportEntity])
  ],
  providers: [
    ...ReportPersistenceProvider,
    ...ReportsProvider,
  ],
  controllers: [

  ],
   
  exports: [
   
  ],
})
export class ReportModule extends NestBaseModule {
  constructor() {
    super('Reportes',[ ...ReportsProvider]);
  }
}


