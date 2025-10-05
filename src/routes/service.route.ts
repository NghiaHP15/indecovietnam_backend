import { Router } from "express";
import * as serviceController from "../controllers/service.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.get("/slug/:slug", serviceController.getServiceBySlug);
router.post("/", authAdminMiddleware, serviceController.createService);
router.put("/:id", authAdminMiddleware, serviceController.updateService);
router.delete("/:id", authAdminMiddleware, serviceController.deleteService);

export default router;