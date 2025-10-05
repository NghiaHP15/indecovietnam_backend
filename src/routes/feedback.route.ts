import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller";
import { validateFeeback } from "../validators/feedback.validators";
import { handleValidationError } from "../middlewares/handleValidation.middleware";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", feedbackController.getAllfeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/", validateFeeback, handleValidationError, feedbackController.createFeedback);
router.put("/:id", authAdminMiddleware, feedbackController.updateFeedback);
router.delete("/:id", authAdminMiddleware, feedbackController.deleteFeedback);

export default router;