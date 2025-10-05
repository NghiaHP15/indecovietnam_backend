import { Router } from "express";
import * as serviceCategoryController from "../controllers/serviceCategory.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", serviceCategoryController.getAllServiceCategories);
router.get("/:id", serviceCategoryController.getServiceCategoryById);
router.post("/", authAdminMiddleware, serviceCategoryController.createServiceCategory);
router.put("/:id", authAdminMiddleware, serviceCategoryController.updateServiceCategory);
router.delete("/:id", authAdminMiddleware, serviceCategoryController.deleteServiceCategory);

export default router;