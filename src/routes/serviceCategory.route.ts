import { Router } from "express";
import * as serviceCategoryController from "../controllers/serviceCategory.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", serviceCategoryController.getAllServiceCategories);
router.get("/:id", serviceCategoryController.getServiceCategoryById);
router.post("/", authMiddleware, serviceCategoryController.createServiceCategory);
router.put("/:id", authMiddleware, serviceCategoryController.updateServiceCategory);
router.delete("/:id", authMiddleware, serviceCategoryController.deleteServiceCategory);

export default router;