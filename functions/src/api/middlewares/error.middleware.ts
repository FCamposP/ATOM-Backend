import {Request, Response, NextFunction} from "express";
import {ApiError} from "../../shared/api-error";
import {errorResponse} from "../../shared/response-wrapper";
import { HttpStatus } from "../../shared/enums/http-statuses";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    res
      .status(err.statusCode)
      .json(errorResponse(err.statusCode, err.message));
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"));
}
