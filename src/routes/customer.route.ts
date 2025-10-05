import { Router } from "express";
import * as customerController from "../controllers/customer.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.get("/email/:email", customerController.getCustomerByEmail);
router.post("/", authAdminMiddleware, customerController.createCustomer);
router.put("/:id", authAdminMiddleware, customerController.updateCustomer);
router.delete("/:id", authAdminMiddleware, customerController.deleteCustomer);

export default router;