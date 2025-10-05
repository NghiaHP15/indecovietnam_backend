import { Router } from "express";
import * as roomCategoryController from "../controllers/roomCategory.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", roomCategoryController.getAllRoomCategories);
router.get("/:id", roomCategoryController.getRoomCategoryById);
router.post("/", authAdminMiddleware, roomCategoryController.createRoomCategory);
router.put("/:id", authAdminMiddleware, roomCategoryController.updateRoomCategory);
router.delete("/:id", authAdminMiddleware, roomCategoryController.deleteRoomCategory);

export default router;