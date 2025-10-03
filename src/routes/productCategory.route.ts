import { Router } from "express";
import * as productCategoryController from "../controllers/productCategory.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", productCategoryController.getAllProductCategories);
router.get("/:id", productCategoryController.getProductCategoryById);
router.post("/", authMiddleware, productCategoryController.createProductCategory);
router.put("/:id", authMiddleware, productCategoryController.updateProductCategory);
router.delete("/:id", authMiddleware, productCategoryController.deleteProductCategory);

export default router;