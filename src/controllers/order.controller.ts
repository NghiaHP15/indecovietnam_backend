import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const results = await orderService.getAllOrders(req.query);
        successResponse(res, "Successfully fetched all order ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderService.getOrderById(id);
        singleResponse(res, "Order found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const result = await orderService.createOrder(req.body);
        singleResponse(res, "Order created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderService.updateOrder(id, req.body);
        singleResponse(res, "Order updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderService.deleteOrder(id);
        singleResponse(res, "Order deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
