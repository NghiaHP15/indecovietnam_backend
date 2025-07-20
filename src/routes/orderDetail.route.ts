import { Router } from "express";
import * as orderDetailController from "../controllers/orderDetail.controller";

const router = Router();

router.get("/", orderDetailController.getAllOrderDetails);
router.get("/:id", orderDetailController.getOrderDetailById);
router.post("/", orderDetailController.createOrderDetail);
router.put("/:id", orderDetailController.updateOrderDetail);
router.delete("/:id", orderDetailController.deleteOrderDetail);

export default router;