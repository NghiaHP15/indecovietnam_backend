import { Router } from "express";
import * as productVariantController from "../controllers/productVariant.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", productVariantController.getAllProductVariants);
router.get("/:id", productVariantController.getProductVariantById);
router.post("/", authMiddleware, productVariantController.createProductVariant);
router.put("/:id", authMiddleware, productVariantController.updateProductVarinant);
router.delete("/:id", authMiddleware, productVariantController.deleteProductVariant);

export default router;