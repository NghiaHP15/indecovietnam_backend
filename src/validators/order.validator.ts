// @ts-ignore
import { body } from "express-validator";
import * as customerService from "../services/customer.service";
import * as productVariantService from "../services/productVariant.service";
import * as orderService from "../services/productVariant.service";
import { PaymentMethod } from "../utils/enum";

export const validateCreateOrder = [
    body("customer.id")
    .notEmpty().withMessage("Customer ID is required.")
    .isUUID().withMessage("Customer ID must be a valid UUID.")
    .custom(async (id: string) => {
        const result = await customerService.getCustomerById(id);
        if (!result) {
            throw new Error("Customer not found.");
        }
    }),

    body("paymentmethod")
    .notEmpty().withMessage("Payment method ID is required."),

    body("products")
    .isArray({ min: 1 }).withMessage("Order must contain at least one product."),

    body("products.*.product_variant.id")
    .notEmpty().withMessage("Product variant ID is required for each product.")
    .isUUID().withMessage("Product variant ID must be a valid UUID.")
    .custom(async (id: string) => {
        console.log("Id validator", id);
        
        const result = await productVariantService.getProductVariantById(id);
        console.log(result);
        
        if (!result) {
            throw new Error("Product variant not found.");
        }
    }),
];
