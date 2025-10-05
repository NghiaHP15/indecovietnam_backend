import { Router } from "express";
import * as notiController from "../controllers/notification.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", authAdminMiddleware, notiController.getUnread);
router.get("/read-all", authAdminMiddleware, notiController.readAll);
router.get("/:id", authAdminMiddleware, notiController.markAsRead);

export default router;