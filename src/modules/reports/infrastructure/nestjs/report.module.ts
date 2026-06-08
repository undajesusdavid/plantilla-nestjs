import { Module } from '@nestjs/common';
import { NestBaseModule } from '@src/shared/infrastructure/framework/nest/module/nest-base-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReportEntity } from '../persistence/user-report/UserReportEntity';
import { ReportsProvider } from './context/poviders/report.provider';
import { ReportPersistenceProvider } from './context/poviders/persistence.provider';
import { ServiceProviders } from './context/poviders/service.provider';
import { UserReportsController } from './controllers/user-reports.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserReportEntity])
  ],
  providers: [
    ...ReportPersistenceProvider,
    ...ReportsProvider,
    ...ServiceProviders,
  ],
  controllers: [
    UserReportsController,
  ],
   
  exports: [
   
  ],
})
export class ReportModule extends NestBaseModule {
  constructor() {
    super('Reportes',[ ...ReportsProvider]);
  }
}


