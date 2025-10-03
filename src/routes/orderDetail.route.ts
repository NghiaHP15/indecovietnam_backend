import { Router } from "express";
import * as orderDetailController from "../controllers/orderDetail.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", orderDetailController.getAllOrderDetails);
router.get("/:id", orderDetailController.getOrderDetailById);
router.post("/", authMiddleware, orderDetailController.createOrderDetail);
router.put("/:id", authMiddleware, orderDetailController.updateOrderDetail);
router.delete("/:id", authMiddleware, orderDetailController.deleteOrderDetail);

export default router;