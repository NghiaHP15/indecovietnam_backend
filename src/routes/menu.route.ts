import { Router } from "express";
import * as menuController from "../controllers/menu.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", menuController.getAllMenus);
router.get("/:id", menuController.getMenuById);
router.post("/", authMiddleware, menuController.createMenu);
router.put("/:id", authMiddleware, menuController.updateMenu);
router.delete("/:id", authMiddleware, menuController.deleteMenu);

export default router;