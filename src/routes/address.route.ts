import { Router } from "express";
import * as addressController from "../controllers/address.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", authMiddleware, addressController.getAllAddresses);
router.get("/:id",authMiddleware, addressController.getAddressById);
router.post("/",authMiddleware, addressController.createAddress);
router.put("/:id",authMiddleware, addressController.updateAddress);
router.delete("/:id",authMiddleware, addressController.deleteAddress);

export default router;