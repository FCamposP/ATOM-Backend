import {Request, Response, NextFunction} from "express";
import {ZodSchema} from "zod";
import {ApiError} from "../../shared/api-error";
import { HttpStatus } from "../../shared/enums/http-statuses";

export const validate =
  (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        throw new ApiError(HttpStatus.BAD_REQUEST, result.error.issues[0].message);
      }

      req.body = result.data;
      next();
    };
