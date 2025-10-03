import { Router } from "express";
import * as roomCategoryController from "../controllers/roomCategory.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", roomCategoryController.getAllRoomCategories);
router.get("/:id", roomCategoryController.getRoomCategoryById);
router.post("/", authMiddleware, roomCategoryController.createRoomCategory);
router.put("/:id", authMiddleware, roomCategoryController.updateRoomCategory);
router.delete("/:id", authMiddleware, roomCategoryController.deleteRoomCategory);

export default router;