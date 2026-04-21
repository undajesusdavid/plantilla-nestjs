import * as fs from 'fs';
import * as path from 'path';

const featureName = process.argv[2];
if (!featureName) {
  console.error('Por favor, proporciona el nombre de la funcionalidad (ej. product)');
  process.exit(1);
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const camelCase = (s: string) => s.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const pascalCase = (s: string) => capitalize(camelCase(s));

const baseDir = path.join(process.cwd(), 'src', 'modules', featureName);

const dirs = [
  'app/create-' + featureName,
  'core/entities',
  'core/contracts',
  'core/value-objects',
  'infrastructure/nestjs/context/exports',
  'infrastructure/nestjs/context/imports',
  'infrastructure/nestjs/context/providers',
  'infrastructure/nestjs/controllers',
  'infrastructure/persistence/typeorm',
];

console.log(`🚀 Generando estructura para: ${featureName}...`);

dirs.forEach((dir) => {
  const fullPath = path.join(baseDir, dir);
  fs.mkdirSync(fullPath, { recursive: true });
});

// Template: Entity
const entityContent = `export interface ${pascalCase(featureName)}Props {
  id: string;
  name: string;
}

export class ${pascalCase(featureName)} {
  constructor(private props: ${pascalCase(featureName)}Props) {}

  getId(): string { return this.props.id; }
  getName(): string { return this.props.name; }
}
`;
fs.writeFileSync(path.join(baseDir, 'core/entities', `${pascalCase(featureName)}.ts`), entityContent);

// Template: Command
const commandContent = `import { Command } from '@shared/app/bus/command';

export class Create${pascalCase(featureName)}Command implements Command {
  readonly name: string;

  constructor(props: { name: string }) {
    this.name = props.name;
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'app/create-' + featureName, `create-${featureName}.command.ts`), commandContent);

// Template: UseCase
const useCaseContent = `import { BaseUseCase } from '@shared/app/use-cases/base.use-case';
import { Create${pascalCase(featureName)}Command } from './create-${featureName}.command';
import { ${pascalCase(featureName)} } from '@modules/${featureName}/core/entities/${pascalCase(featureName)}';

export class Create${pascalCase(featureName)}UseCase extends BaseUseCase<Create${pascalCase(featureName)}Command, ${pascalCase(featureName)}> {
  static readonly HANDLED_COMMAND = Create${pascalCase(featureName)}Command;

  constructor() {
    super();
  }

  protected async internalExecute(command: Create${pascalCase(featureName)}Command): Promise<${pascalCase(featureName)}> {
    console.log('Ejecutando creación de ${featureName}:', command.name);
    return new ${pascalCase(featureName)}({ id: 'new-id', name: command.name });
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'app/create-' + featureName, `create-${featureName}.use-case.ts`), useCaseContent);

console.log(`✅ Estructura de "${featureName}" creada exitosamente en src/modules/${featureName}`);


