import { Router } from "express";
import * as paymentController from "../controllers/paymentmethod.controller";

const router = Router();

router.get("/", paymentController.getAllPaymentMethods);
router.get("/:id", paymentController.getPaymentMethodById);
router.post("/", paymentController.createPaymentMethod);
router.put("/:id", paymentController.updatePaymentMethod);
router.delete("/:id", paymentController.deletePaymentMethod);

export default router;