import { Router } from "express";
import * as galleryController from "../controllers/gallery.controller";

const router = Router();

router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleryById);
router.post("/", galleryController.createGallery);
router.put("/:id", galleryController.updateGallery);
router.delete("/:id", galleryController.deleteGallery);

export default router;