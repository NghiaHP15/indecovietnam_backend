import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/get-total-order", authAdminMiddleware, dashboardController.getTotalOrders);
router.get("/get-sum-order", authAdminMiddleware, dashboardController.getSumOrders);
router.get("/get-sum-feedback", authAdminMiddleware, dashboardController.getSumFeedbacks);
router.get("/get-sum-customer", authAdminMiddleware, dashboardController.getSumCustomers);
router.get("/get-top-customer", authAdminMiddleware, dashboardController.getTopCustomers);
router.get("/get-new-order", authAdminMiddleware, dashboardController.getNewOrders);
router.get("/get-top-product", authAdminMiddleware, dashboardController.getTopProducts);
router.get("/get-orders-by-month", authAdminMiddleware, dashboardController.getRevenueAndOrdersByMonth);

export default router;