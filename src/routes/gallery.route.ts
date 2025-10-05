import { Router } from "express";
import * as galleryController from "../controllers/gallery.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleryById);
router.post("/", authAdminMiddleware, galleryController.createGallery);
router.put("/:id", authAdminMiddleware, galleryController.updateGallery);
router.delete("/:id", authAdminMiddleware, galleryController.deleteGallery);

export default router;