import { Router } from "express";
import * as colorController from "../controllers/color.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", colorController.getAllColors);
router.get("/:id", colorController.getColorById);
router.post("/", authMiddleware, colorController.createColor);
router.put("/:id", authMiddleware, colorController.updateColor);
router.delete("/:id", authMiddleware, colorController.deleteColor);

export default router;