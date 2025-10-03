import { authMiddleware } from './../middlewares/authCutomer.middleware';
import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { validateCreateOrder } from "../validators/order.validator";
import { handleValidationError } from "../middlewares/handleValidation.middleware";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.get("/txnref/:txnRef", orderController.getOrderByTxnRef);
router.post("/", authMiddleware, validateCreateOrder, handleValidationError, orderController.createOrder);
router.put("/retry/:id", authMiddleware, orderController.retryPayment);
router.put("/update/:id", authMiddleware, orderController.updateOrder);
router.put("/cancel/:id", authMiddleware, orderController.cancelOrder);
router.get("/payment/ipn", orderController.ipnPayment);
router.get("/momo/return", orderController.momoReturn);
router.get("/search/order", orderController.getSearchOrders);

export default router;