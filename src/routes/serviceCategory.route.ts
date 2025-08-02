import { Router } from "express";
import * as serviceCategoryController from "../controllers/serviceCategory.controller";

const router = Router();

router.get("/", serviceCategoryController.getAllServiceCategories);
router.get("/:id", serviceCategoryController.getServiceCategoryById);
router.post("/", serviceCategoryController.createServiceCategory);
router.put("/:id", serviceCategoryController.updateServiceCategory);
router.delete("/:id", serviceCategoryController.deleteServiceCategory);

export default router;