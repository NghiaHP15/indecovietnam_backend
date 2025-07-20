import { Request, Response } from "express";
import * as paymentMethodService from "../services/paymentmethod.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllPaymentMethods = async (req: Request, res: Response) => {
    try {
        const results = await paymentMethodService.getAllPaymentMethods(req.query);
        successResponse(res, "Successfully fetched all payment method", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getPaymentMethodById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await paymentMethodService.getPaymentMethodById(id);
        singleResponse(res, "Payment method found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createPaymentMethod = async (req: Request, res: Response) => {
    try {
        const result = await paymentMethodService.createPaymentMethod(req.body);
        singleResponse(res, "Payment method created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updatePaymentMethod = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await paymentMethodService.updatePaymentMethod(id, req.body);
        singleResponse(res, "Payment method updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deletePaymentMethod = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await paymentMethodService.deletePaymentMethod(id);
        singleResponse(res, "Payment method deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
