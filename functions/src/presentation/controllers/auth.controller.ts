import {Request, Response} from "express";
import {successResponse, errorResponse} from "../../shared/response-wrapper";
import {asyncHandler} from "../../shared/async-handler";
import {FirestoreUserRepository} from "../../infrastructure/repositories/FirestoreUserRepository";
import {RegisterUseCase} from "../../application/use-cases/auth/Register.usecase";
import {LoginUseCase} from "../../application/use-cases/auth/Login.usecase";

const userRepo = new FirestoreUserRepository();
const registerUseCase = new RegisterUseCase(userRepo);
const loginUseCase = new LoginUseCase(userRepo);

export const register = asyncHandler(async (req: Request, res: Response) => {
  const {email} = req.body;

  if (!email) {
    return res
      .status(400)
      .json(errorResponse(400, "Email es requerido"));
  }

  const user = await registerUseCase.execute(email);

  return res.status(201).json(
    successResponse(201, user, "Usuario registrado")
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const {email} = req.body;

  if (!email) {
    return res.status(400).json(errorResponse(400, "Email es requerido"));
  }
  const token = await loginUseCase.execute(email);

  if (!token) {
    return res.status(200).json(errorResponse(404, "Usuario no encontrado"));
  }

  return res.status(200).json(successResponse(200, {token}, "Usuario verificado"));
});
