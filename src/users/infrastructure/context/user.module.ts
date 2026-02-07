import { Module } from '@nestjs/common';
import { UserControllers } from './controllers';
import { UserImports } from './imports';
import { Providers, ProvidersExport } from './providers';

@Module({
  imports: [...UserImports],
  controllers: [...UserControllers],
  providers: [...Providers],
  exports: [...ProvidersExport]
})
export class UserModule {}