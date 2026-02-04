// api-error.ts corregido
/**
 * Custom API Error class for handling application errors
 */
export class ApiError extends Error {
    /**
   * HTTP status code
   */
  statusCode: number;
 /**
   * Additional error data
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
