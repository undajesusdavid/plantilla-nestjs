// Seeders
import { seedUsers, SeedUsersToken } from "../../seeders/seedUsers";

export const Seeders = [
  { provide: SeedUsersToken, useValue: seedUsers },
]

export const SeedersExport = [
    ...Seeders.map(s => s.provide)
]