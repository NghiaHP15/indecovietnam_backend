// @ts-ignore
import { body } from "express-validator";
import * as customerService from "../services/customer.service";
import * as paymentmethodService from "../services/paymentmethod.service";
import * as productVariantService from "../services/productVariant.service";
import * as orderService from "../services/productVariant.service";

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

    body("paymentmethod.id")
    .notEmpty().withMessage("Payment method ID is required.")
    .isUUID().withMessage("Payment method ID must be a valid UUID.")
    .custom(async (id: string) => {
        const result = await paymentmethodService.getPaymentMethodById(id);
        if (!result) {
            throw new Error("Payment method not found.");
        }
    }),

    body("products")
    .isArray({ min: 1 }).withMessage("Order must contain at least one product."),

    body("products.*.product_variant.id")
    .notEmpty().withMessage("Product variant ID is required for each product.")
    .isUUID().withMessage("Product variant ID must be a valid UUID.")
    .custom(async (id: string) => {
        const result = await productVariantService.getProductVariantById(id);
        if (!result) {
            throw new Error("Product variant not found.");
        }
    }),
];
