/**
 * Personalización de manejo de errores en ejecución durante validaciones y Middlewares
 */
export class ApiError extends Error {

  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
