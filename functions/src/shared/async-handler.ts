import {Request, Response, NextFunction} from "express";

/**
 * Utilizado para manejar errores de ejecución, evita uso de try catch en endpoints
 * @param fn 
 * @returns 
 */
export const asyncHandler =
  (fn: Function) =>
    (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
