import { IUseCase } from '@shared/core/interfaces/use-case.interface';
import { EventBus } from '../bus/event-bus';
import { Event } from '../bus/event';

export abstract class BaseUseCase<I, O> implements IUseCase<I, O> {

  public eventBus!: EventBus;
  protected readonly sensitiveKeys: string[] = [
    'password',
    'token',
    'contraseña',
    'secret',
    'cvv',
    'authorization'
  ];

  // El método que los hijos implementarán con la lógica real de negocio
  protected abstract internalExecute(input: I): Promise<O>;

  // El método público que ejecuta el flujo controlado
  async execute(input: I): Promise<O> {
    try {
      console.log(
        `[${this.constructor.name}] Ejecutando con: ${JSON.stringify(input, this.maskSensitive)}`,
      );
      
      return await this.internalExecute(input);
    } catch (error) {
      this.handleError(error);
    }
  }

  private maskSensitive = (key: string, value: any): any => {
    if (typeof key === 'string' && this.sensitiveKeys.includes(key.toLowerCase())) {
      return '*****';
    }
    return value;
  };

  protected async publishEvent(events: Event | Event[]): Promise<void> {
    if (this.eventBus) {
      await this.eventBus.publish(events);
    }
  }

  private handleError(error: unknown): never {
    console.error(`[Error en ${this.constructor.name}]:`, error);

    // Si ya es un error de nuestro propio dominio, lo dejamos pasar intacto
    if (error && typeof error === 'object' && 'isDomainError' in error) {
      throw error; 
    }

    // Si es un error genérico (ej. fallo de conexión a BD, error de sintaxis)
    // Lanzamos un error nativo de nuestra capa de aplicación, NO de NestJS
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Unexpected application error');
  }
}