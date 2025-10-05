import { Router } from "express";
import * as colorController from "../controllers/color.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", colorController.getAllColors);
router.get("/:id", colorController.getColorById);
router.post("/", authAdminMiddleware, colorController.createColor);
router.put("/:id", authAdminMiddleware, colorController.updateColor);
router.delete("/:id", authAdminMiddleware, colorController.deleteColor);

export default router;