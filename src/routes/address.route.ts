import { Router } from "express";
import * as addressController from "../controllers/address.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", addressController.getAllAddresses);
router.get("/:id", addressController.getAddressById);
router.post("/", authAdminMiddleware, addressController.createAddress);
router.put("/:id", authAdminMiddleware, addressController.updateAddress);
router.delete("/:id", authAdminMiddleware, addressController.deleteAddress);

export default router;