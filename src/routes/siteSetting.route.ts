import { Router } from "express";
import * as siteSettingController from "../controllers/siteSetting.controller";

const router = Router();

router.get("/", siteSettingController.getAllSiteSettings);
router.get("/:id", siteSettingController.getSiteSettingById);
router.post("/", siteSettingController.createSiteSetting);
router.put("/:id", siteSettingController.updateSiteSetting);
router.delete("/:id", siteSettingController.deleteSiteSetting);

export default router;