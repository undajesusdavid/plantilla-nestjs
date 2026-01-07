import { Module } from '@nestjs/common';
import { AccessControlImports } from './imports';
import { AccessControlControllers } from './controllers';
import { Providers, ProvidersExport } from './providers';

@Module({
  imports: [...AccessControlImports],
  controllers: [...AccessControlControllers],
  providers: [...Providers],
  exports: [...ProvidersExport],
})
export class AccessControlModule {}