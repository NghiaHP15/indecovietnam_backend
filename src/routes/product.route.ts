import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/slug/:slug", productController.getProductBySlug);
router.post("/", authAdminMiddleware, productController.createProduct);
router.put("/:id", authAdminMiddleware, productController.updateProduct);
router.delete("/:id", authAdminMiddleware, productController.deleteProduct);
router.get("/view/:id", authAdminMiddleware, productController.viewProduct);

export default router;