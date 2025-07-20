
import { Router } from "express";
import * as authController from "../controllers/authCustomer.controller";
import { validateRegisterCustomer } from "../validators/authCustomer.validator";
import { handleValidationError } from "../middlewares/handleValidation.middleware";

const router = Router();

router.post("/register", validateRegisterCustomer, handleValidationError, authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refresh);
router.post("/logout", authController.logout);
router.post("/login-social", authController.loginWithSocial);

export default router;
