import express from "express";
import * as paymentController  from "../controllers/payment.controller";

const router = express.Router();

router.post("/create", paymentController.createPayment);
router.get("/ipn", paymentController.ipnPayment);
router.get("/momo/return", paymentController.momoReturn);

export default router;