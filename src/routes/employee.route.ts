import { Router } from "express";
import * as employeeController from "../controllers/employee.controller";
import { authAdminMiddleware } from "../middlewares/authAdmin.middleware";

const router = Router();

router.get("/", authAdminMiddleware, employeeController.getAllEmployees);
router.get("/:id", authAdminMiddleware, employeeController.getEmployeeById);
router.get("/email/:email", employeeController.getEmployeeByEmail);
router.post("/", authAdminMiddleware, employeeController.createEmployee);
router.put("/:id", authAdminMiddleware, employeeController.updateEmployee);
router.delete("/:id", authAdminMiddleware, employeeController.deleteEmployee);

export default router;