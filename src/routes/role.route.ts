import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", roleController.getAllRoles);
router.get("/:id", roleController.getRoleById);
router.post("/", authMiddleware, roleController.createRole);
router.put("/:id", authMiddleware, roleController.updateRole);
router.delete("/:id", authMiddleware, roleController.deleteRole);

export default router;