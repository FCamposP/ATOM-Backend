import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../shared/response-wrapper";
import { asyncHandler } from "../../shared/async-handler";
import { AuthRegisterUseCase } from "../../auth/application/use-cases/auth-register.usecase";
import { AuthLoginUseCase } from "../../auth/application/use-cases/auth-login.usecase";


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
        .status(400)
        .json(errorResponse(400, "Email es requerido"));
    }

    const user = await this.registerUseCase.execute(email);

    return res.status(201).json(
      successResponse(201, user, "Usuario registrado")
    );
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(errorResponse(400, "Email es requerido"));
    }
    const token = await this.loginUseCase.execute(email);

    if (!token) {
      return res.status(200).json(errorResponse(404, "Usuario no encontrado"));
    }

    return res.status(200).json(successResponse(200, { token }, "Usuario verificado"));
  });
}


