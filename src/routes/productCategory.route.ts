import { Router } from "express";
import * as productCategoryController from "../controllers/productCategory.controller";

const router = Router();

router.get("/", productCategoryController.getAllProductCategories);
router.get("/:id", productCategoryController.getProductCategoryById);
router.post("/", productCategoryController.createProductCategory);
router.put("/:id", productCategoryController.updateProductCategory);
router.delete("/:id", productCategoryController.deleteProductCategory);

export default router;