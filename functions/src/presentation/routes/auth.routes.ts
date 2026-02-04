import {Router} from "express";
import {register, login} from "../controllers/auth.controller";
import {createUserSchema} from "../schemas/user.schema";
import {validate} from "../../middlewares/validate.middleware";

const router = Router();

router.post("/register", validate(createUserSchema), register);
router.post("/login", login);

export default router;
