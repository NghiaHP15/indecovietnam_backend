import { Router } from "express";
import upload from "../config/multer.config";
import * as uploadController from "../controllers/upload.controller";

const router = Router();

router.get("/image", uploadController.getImage);
router.post("/image", upload.single("image"), uploadController.uploadImage);
router.delete("/image", uploadController.deleteImage);

module.exports = router;

export default router;