import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { validateCreateOrder } from "../validators/order.validator";
import { handleValidationError } from "../middlewares/handleValidation.middleware";
import { authCustomerMiddleware } from "../middlewares/authCutomer.middleware";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/admin-get-all",authAdminMiddleware, orderController.getAllOrders);
router.get("/admin-get/:id",authAdminMiddleware, orderController.getOrderById);
router.post("/admin-create", authAdminMiddleware, validateCreateOrder, handleValidationError, orderController.createOrder);
router.put("/admin-update/:id", authAdminMiddleware, orderController.updateOrder);
router.put("/admin-cancel/:id", authAdminMiddleware, orderController.cancelOrder);
router.get("/:id",authCustomerMiddleware, orderController.getOrderById);
router.get("/",authCustomerMiddleware, orderController.getAllOrders);
router.post("/", authCustomerMiddleware, validateCreateOrder, handleValidationError, orderController.createOrder);
router.get("/txnref/:txnRef",authCustomerMiddleware, orderController.getOrderByTxnRef);
router.put("/cancel/:id", authCustomerMiddleware, orderController.cancelOrder);
router.put("/retry/:id", authCustomerMiddleware, orderController.retryPayment);
router.get("/payment/ipn", authCustomerMiddleware, orderController.ipnPayment);
router.get("/momo/return", authCustomerMiddleware, orderController.momoReturn);
router.get("/search/order", authCustomerMiddleware, orderController.getSearchOrders);

export default router;