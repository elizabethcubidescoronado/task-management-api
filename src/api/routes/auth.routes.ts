import { Router } from "express";
import { registerUser } from "../../controllers/auth.controller";
import { loginUser } from "../../controllers/auth.controller";
import { validateRegister } from "../middlewares/validate-register.middleware";
import { validateLogin } from "../middlewares/validate-login.middleware";

const router = Router();
router.post("/login", validateLogin, loginUser);
router.post("/register", validateRegister, registerUser);

export default router;