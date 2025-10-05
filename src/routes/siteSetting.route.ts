import { Router } from "express";
import * as siteSettingController from "../controllers/siteSetting.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", siteSettingController.getAllSiteSettings);
router.get("/:id", siteSettingController.getSiteSettingById);
router.post("/", authAdminMiddleware, siteSettingController.createSiteSetting);
router.put("/:id", authAdminMiddleware, siteSettingController.updateSiteSetting);
router.delete("/:id", authAdminMiddleware, siteSettingController.deleteSiteSetting);

export default router;