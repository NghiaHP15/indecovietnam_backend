// @ts-ignore
import { body } from "express-validator";
import * as customerService from "../services/customer.service";

export const validateRegisterCustomer = [
    body("email")
        .isEmail()
        .withMessage("Email is not valid")
        .custom(async (email: string) => {
            const customer = await customerService.getCustomerByEmail(email);
            if (customer) {
                throw new Error("Email already in use");
            }
        }),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("firstname").isLength({ min: 2 }).withMessage("First name must be at least 2 characters long"),
    body("lastname").isLength({ min: 2 }).withMessage("Last name must be at least 2 characters long"),
];
