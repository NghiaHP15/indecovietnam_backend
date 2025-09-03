import { Router } from "express";
import * as notiController from "../controllers/notification.controller";

const router = Router();

router.get("/", notiController.getUnread);
router.get("/:id", notiController.markAsRead);

export default router;