import { Router } from "express";
import { createUserSchema } from "../schemas/user.schema";
import { validate } from "../middlewares/validate.middleware";
import { AuthController } from "../controllers/auth.controller";
import { FirestoreUserRepository } from "../../auth/infraestructure/persistence/firestore-user-repository";
import { AuthRegisterUseCase } from "../../auth/application/use-cases/auth-register.usecase";
import { UserFactory } from "../../auth/domain/factories/user.factory";
import { UserMapper } from "../../auth/infraestructure/mappers/user.mapper";
import { AuthLoginUseCase } from "../../auth/application/use-cases/auth-login.usecase";

const router = Router();

//dependencias
const repo = new FirestoreUserRepository();
const userFactory = new UserFactory();
const userMapper = new UserMapper();

const controller = new AuthController(
    new AuthRegisterUseCase(repo, userFactory, userMapper),
    new AuthLoginUseCase(repo)
);

router.post("/register", validate(createUserSchema), controller.register);
router.post("/login", controller.login);

export default router;
