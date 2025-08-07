import { Router } from "express";
import * as customerController from "../controllers/customer.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", customerController.getAllCustomers);
router.get("/:id", customerController.getCustomerById);
router.get("/email/:email", authMiddleware, customerController.getCustomerByEmail);
router.post("/", customerController.createCustomer);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;