import { Request, Response } from "express";
import * as orderDetailService from "../services/orderDetail.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";

export const getAllOrderDetails = async (req: Request, res: Response) => {
    try {
        const results = await orderDetailService.getAllOrderDetails(req.query);
        successResponse(res, "Successfully fetched all order detail", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getOrderDetailById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderDetailService.getOrderDetailById(id);
        singleResponse(res, "Order detail found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createOrderDetail = async (req: Request, res: Response) => {
    try {
        const result = await orderDetailService.createOrderDetail(req.body);
        singleResponse(res, "Order detail created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateOrderDetail = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderDetailService.updateOrderDetail(id, req.body);
        singleResponse(res, "Order detail updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteOrderDetail = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderDetailService.deleteOrderDetail(id);
        singleResponse(res, "Order detal deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
