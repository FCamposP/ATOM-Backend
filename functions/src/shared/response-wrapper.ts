/**
 * Estructura estándar de respuestas de todos los endpoints para mejor manejo de respuestas en el cliente
 */
export interface ResponseWrapper<T> {
  status: number;
  data: T | null;
  message: string;
}

/**
 * Plantilla para crear respuestas con resultados exitosos
 * @param status estado de transacción, si todo fue exitoso utilizar 200
 * @param data respuesta del servicio
 * @param message mensaje de apoyo al resultado de la transacción. Pueden ser mensajes de éxito o errores.
 * @returns estructura de respuesta estándar
 */
export function successResponse<T>(status: number, data: T, message: string): ResponseWrapper<T> {
  return {
    status,
    data,
    message,
  };
}

/**
 * Plantilla para crear respuestas con resultados con errores
 * @param status estado de transacción 
 * @param message mensaje de apoyo para identificar el motivo del error
 * @returns estructura de respuesta estándar
 */
export function errorResponse(status: number, message: string): ResponseWrapper<null> {
  return {
    status,
    data: null,
    message,
  };
}
