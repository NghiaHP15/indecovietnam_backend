import { Router } from "express";
import * as authController from "../controllers/authEmployee.controller";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/reset-password", authController.resetPassword);

export default router;
