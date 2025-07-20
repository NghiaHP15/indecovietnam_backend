import { Router } from "express";
import * as menuController from "../controllers/menu.controller";

const router = Router();

router.get("/", menuController.getAllMenus);
router.get("/:id", menuController.getMenuById);
router.post("/", menuController.createMenu);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

export default router;