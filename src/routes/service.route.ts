import { Router } from "express";
import * as serviceController from "../controllers/service.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.get("/slug/:slug", serviceController.getServiceBySlug);
router.post("/", authMiddleware, serviceController.createService);
router.put("/:id", authMiddleware, serviceController.updateService);
router.delete("/:id", authMiddleware, serviceController.deleteService);

export default router;