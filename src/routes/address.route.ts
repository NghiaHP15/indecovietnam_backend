import { Router } from "express";
import * as addressController from "../controllers/address.controller";

const router = Router();

router.get("/", addressController.getAllAddresses);
router.get("/:id", addressController.getAddressById);
router.post("/", addressController.createAddress);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

export default router;