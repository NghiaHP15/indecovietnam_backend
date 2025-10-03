import { Router } from "express";
import upload from "../config/multer.config";
import * as uploadController from "../controllers/upload.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/image", uploadController.getImage);
router.post("/image", authMiddleware, upload.single("image"), uploadController.uploadImage);
router.delete("/image", authMiddleware, uploadController.deleteImage);
router.delete("/image/delete-multi", authMiddleware, uploadController.deleteImageMulti);

module.exports = router;

export default router;