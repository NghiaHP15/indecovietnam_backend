import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get("/get-total-order", dashboardController.getTotalOrders);
router.get("/get-sum-order", dashboardController.getSumOrders);
router.get("/get-sum-feedback", dashboardController.getSumFeedbacks);
router.get("/get-sum-customer", dashboardController.getSumCustomers);
router.get("/get-top-customer", dashboardController.getTopCustomers);
router.get("/get-new-order", dashboardController.getNewOrders);
router.get("/get-top-product", dashboardController.getTopProducts);
router.get("/get-orders-by-month", dashboardController.getRevenueAndOrdersByMonth);

export default router;