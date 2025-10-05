import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", authAdminMiddleware, roleController.getAllRoles);
router.get("/:id", authAdminMiddleware, roleController.getRoleById);
router.post("/", authAdminMiddleware, roleController.createRole);
router.put("/:id", authAdminMiddleware, roleController.updateRole);
router.delete("/:id", authAdminMiddleware, roleController.deleteRole);

export default router;