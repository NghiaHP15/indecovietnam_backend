import { Router } from "express";
import * as menuController from "../controllers/menu.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", menuController.getAllMenus);
router.get("/:id", menuController.getMenuById);
router.post("/", authAdminMiddleware, menuController.createMenu);
router.put("/:id", authAdminMiddleware, menuController.updateMenu);
router.delete("/:id", authAdminMiddleware, menuController.deleteMenu);

export default router;