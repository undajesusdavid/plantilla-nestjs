//Servicios
import { Services, ServicesExport } from './services';
// Use Cases
import { UseCases, UseCaseExport } from './usecases';
// Mappers
import { Mappers, MappersExport } from './mappers';
// Seeders
import { Seeders, SeedersExport,  } from './seeders';



export const Providers = [
  ...Services,
  ...UseCases,
  ...Mappers,
  ...Seeders,
]

export const ProvidersExport = [
  ...ServicesExport,
  ...UseCaseExport,
  ...MappersExport,
  ...SeedersExport,
]