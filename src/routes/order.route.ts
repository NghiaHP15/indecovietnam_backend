import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { validateCreateOrder } from "../validators/order.validator";
import { handleValidationError } from "../middlewares/handleValidation.middleware";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", validateCreateOrder, handleValidationError, orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;