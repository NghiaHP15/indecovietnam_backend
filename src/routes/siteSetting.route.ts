import { Router } from "express";
import * as siteSettingController from "../controllers/siteSetting.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", siteSettingController.getAllSiteSettings);
router.get("/:id", siteSettingController.getSiteSettingById);
router.post("/", authMiddleware, siteSettingController.createSiteSetting);
router.put("/:id", authMiddleware, siteSettingController.updateSiteSetting);
router.delete("/:id", authMiddleware, siteSettingController.deleteSiteSetting);

export default router;