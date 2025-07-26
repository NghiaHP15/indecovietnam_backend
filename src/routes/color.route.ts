import { Router } from "express";
import * as colorController from "../controllers/color.controller";

const router = Router();

router.get("/", colorController.getAllColors);
router.get("/:id", colorController.getColorById);
router.post("/", colorController.createColor);
router.put("/:id", colorController.updateColor);
router.delete("/:id", colorController.deleteColor);

export default router;