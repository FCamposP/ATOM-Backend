import {Request, Response, NextFunction} from "express";
import {ZodSchema} from "zod";
import {ApiError} from "../../shared/api-error";

export const validate =
  (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        throw new ApiError(400, result.error.issues[0].message);
      }

      req.body = result.data;
      next();
    };
