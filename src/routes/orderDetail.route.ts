import { Router } from "express";
import * as orderDetailController from "../controllers/orderDetail.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", authAdminMiddleware, orderDetailController.getAllOrderDetails);
router.get("/:id", authAdminMiddleware, orderDetailController.getOrderDetailById);
router.post("/", authAdminMiddleware, orderDetailController.createOrderDetail);
router.put("/:id", authAdminMiddleware, orderDetailController.updateOrderDetail);
router.delete("/:id", authAdminMiddleware, orderDetailController.deleteOrderDetail);

export default router;