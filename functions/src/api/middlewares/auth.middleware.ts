import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { HttpStatus } from "../../shared/enums/http-statuses";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      data: null,
      message: "No se identificó autenticación",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      data: null,
      message: "Formato de token inválido. Usa: Bearer <token>",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded as any;

    return next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        data: null,
        message: "Token vencido",
      });
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      data: null,
      message: "Token inválido",
    });
  }
}
