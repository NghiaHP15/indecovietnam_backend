import { Router } from "express";
import * as policyController from "../controllers/policy.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", policyController.getAllPolicies);
router.get("/:id", policyController.getPolicyById);
router.post("/", authMiddleware, policyController.createPolicy);
router.put("/:id", authMiddleware, policyController.updatePolicy);
router.delete("/:id", authMiddleware, policyController.deletePolicy);
router.get("/slug/:slug", policyController.getPolicyBySlug);

export default router;