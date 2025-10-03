import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/get-total-order", authMiddleware, dashboardController.getTotalOrders);
router.get("/get-sum-order", authMiddleware, dashboardController.getSumOrders);
router.get("/get-sum-feedback", authMiddleware, dashboardController.getSumFeedbacks);
router.get("/get-sum-customer", authMiddleware, dashboardController.getSumCustomers);
router.get("/get-top-customer", authMiddleware, dashboardController.getTopCustomers);
router.get("/get-new-order", authMiddleware, dashboardController.getNewOrders);
router.get("/get-top-product", authMiddleware, dashboardController.getTopProducts);
router.get("/get-orders-by-month", authMiddleware, dashboardController.getRevenueAndOrdersByMonth);

export default router;