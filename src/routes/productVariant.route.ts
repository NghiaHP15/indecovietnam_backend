import { Router } from "express";
import * as productVariantController from "../controllers/productVariant.controller";

const router = Router();

router.get("/", productVariantController.getAllProductVariants);
router.get("/:id", productVariantController.getProductVariantById);
router.post("/", productVariantController.createProductVariant);
router.put("/:id", productVariantController.updateProductVarinant);
router.delete("/:id", productVariantController.deleteProductVariant);

export default router;