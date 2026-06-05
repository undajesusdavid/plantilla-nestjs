import { IUseCase } from '@shared/core/interfaces/use-case.interface';

export abstract class ReportUseCase<I, O> implements IUseCase<I, O> {
    //protected pdf! : IPdfGenerator;
    //protected excelGenerator! : IExcelGenerator;

  protected readonly sensitiveKeys: string[] = [
    'password',
    'token',
    'contraseña',
    'secret',
    'cvv',
    'authorization'
  ];


  protected abstract internalExecute(input: I): Promise<O>;

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

  private handleError(error: unknown): never {
    console.error(`[Error en ${this.constructor.name}]:`, error);

    if (error && typeof error === 'object' && 'isDomainError' in error) {
      throw error; 
    }

    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Unexpected application error');
  }

}