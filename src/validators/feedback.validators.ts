// @ts-ignore
import { body } from "express-validator";

export const validateFeeback = [
    body("email").isEmail().withMessage("Email is not valid"),
    body("phone").isLength({ min: 10 }).withMessage("Phone number is not valid"),
    body("name").isLength({ min: 2 }).withMessage("name must be at least 2 characters long"),
    body("subject").isLength({ min: 10 }).withMessage("subject must be at least 10 characters long"),
];
