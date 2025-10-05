import { Router } from "express";
import upload from "../config/multer.config";
import * as uploadController from "../controllers/upload.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/image", uploadController.getImage);
router.post("/image", authAdminMiddleware, upload.single("image"), uploadController.uploadImage);
router.delete("/image", authAdminMiddleware, uploadController.deleteImage);
router.delete("/image/delete-multi", authAdminMiddleware, uploadController.deleteImageMulti);

module.exports = router;

export default router;