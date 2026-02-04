import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../shared/response-wrapper";
import { asyncHandler } from "../../shared/async-handler";
import { AuthRegisterUseCase } from "../../auth/application/use-cases/auth-register.usecase";
import { AuthLoginUseCase } from "../../auth/application/use-cases/auth-login.usecase";
import { HttpStatus } from "../../shared/enums/http-statuses";


export class AuthController {
  constructor(
    private readonly registerUseCase: AuthRegisterUseCase,
    private readonly loginUseCase: AuthLoginUseCase
  ) {
  }

  register = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(errorResponse(HttpStatus.BAD_REQUEST, "Email es requerido"));
    }

    const user = await this.registerUseCase.execute(email);

    return res.status(HttpStatus.CREATED).json(
      successResponse(HttpStatus.CREATED, user, "Usuario registrado")
    );
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(HttpStatus.BAD_REQUEST).json(errorResponse(HttpStatus.BAD_REQUEST, "Email es requerido"));
    }
    const token = await this.loginUseCase.execute(email);

    if (!token) {
      return res.status(HttpStatus.NOT_FOUND).json(errorResponse(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    return res.status(HttpStatus.OK).json(successResponse(HttpStatus.OK, { token }, "Usuario verificado"));
  });
}


