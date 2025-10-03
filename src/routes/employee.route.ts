import { Router } from "express";
import * as employeeController from "../controllers/employee.controller";
import { authMiddleware } from "../middlewares/authCutomer.middleware";

const router = Router();

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.get("/email/:email", employeeController.getEmployeeByEmail);
router.post("/", authMiddleware, employeeController.createEmployee);
router.put("/:id", authMiddleware, employeeController.updateEmployee);
router.delete("/:id", authMiddleware, employeeController.deleteEmployee);

export default router;