import { Router } from "express";
import * as productVariantController from "../controllers/productVariant.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", productVariantController.getAllProductVariants);
router.get("/:id", productVariantController.getProductVariantById);
router.post("/", authAdminMiddleware, productVariantController.createProductVariant);
router.put("/:id", authAdminMiddleware, productVariantController.updateProductVarinant);
router.delete("/:id", authAdminMiddleware, productVariantController.deleteProductVariant);

export default router;