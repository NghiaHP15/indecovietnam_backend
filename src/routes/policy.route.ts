import { Router } from "express";
import * as policyController from "../controllers/policy.controller";

const router = Router();

router.get("/", policyController.getAllPolicies);
router.get("/:id", policyController.getPolicyById);
router.post("/", policyController.createPolicy);
router.put("/:id", policyController.updatePolicy);
router.delete("/:id", policyController.deletePolicy);

export default router;