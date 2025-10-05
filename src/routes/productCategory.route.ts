import { Router } from "express";
import * as productCategoryController from "../controllers/productCategory.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", productCategoryController.getAllProductCategories);
router.get("/:id", productCategoryController.getProductCategoryById);
router.post("/", authAdminMiddleware, productCategoryController.createProductCategory);
router.put("/:id", authAdminMiddleware, productCategoryController.updateProductCategory);
router.delete("/:id", authAdminMiddleware, productCategoryController.deleteProductCategory);

export default router;