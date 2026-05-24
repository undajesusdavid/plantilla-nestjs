import { ValidationError, UnprocessableEntityException, ValidationPipe } from "@nestjs/common";

// Función auxiliar recursiva para extraer el error real, ideal para DTOs anidados
const mapErrors = (errors: ValidationError[]) => {
  return errors.reduce((acc, error) => {
    // Si el error tiene hijos (validación anidada), bajamos un nivel recursivamente
    if (error.children && error.children.length > 0) {
      acc[error.property] = mapErrors(error.children);
    } else {
      // Si es un error normal, agarramos el primer mensaje disponible
      const constraints = Object.values(error.constraints || {});
      acc[error.property] = constraints.length > 0 ? constraints[0] : 'Dato inválido';
    }
    return acc;
  }, {} as Record<string, any>);
};

export const GlobalPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: { enableImplicitConversion: false },
  errorHttpStatusCode: 422,
  exceptionFactory: (validationErrors) => {
    const errorsObject = mapErrors(validationErrors);
    // Devolvemos el objeto mapeado dentro de un array para mantener tu firma actual
    return new UnprocessableEntityException([errorsObject]);
  },
});