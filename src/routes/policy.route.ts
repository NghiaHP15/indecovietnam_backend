import { Router } from "express";
import * as policyController from "../controllers/policy.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", policyController.getAllPolicies);
router.get("/:id", policyController.getPolicyById);
router.get("/slug/:slug", policyController.getPolicyBySlug);
router.post("/", authAdminMiddleware, policyController.createPolicy);
router.put("/:id", authAdminMiddleware, policyController.updatePolicy);
router.delete("/:id", authAdminMiddleware, policyController.deletePolicy);

export default router;