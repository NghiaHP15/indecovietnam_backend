import { Router } from "express";
import * as galleryController from "../controllers/gallery.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleryById);
router.post("/", authMiddleware, galleryController.createGallery);
router.put("/:id", authMiddleware, galleryController.updateGallery);
router.delete("/:id", authMiddleware, galleryController.deleteGallery);

export default router;