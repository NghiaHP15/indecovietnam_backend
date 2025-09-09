import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";
import { errorResponse, singleResponse, successResponse } from "../utils/response";

export const getTotalOrders = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getTotalOrders();
        singleResponse(res, "Successfully fetched get total orders ", results);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getSumOrders = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getSumOrders();
        singleResponse(res, "Successfully fetched get sum orders ", results);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getSumFeedbacks = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getSumFeedbacks();
        singleResponse(res, "Successfully fetched get sum feedbacks ", results);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getSumCustomers = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getSumCustomers();
        singleResponse(res, "Successfully fetched get sum customers", results);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getTopCustomers = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getCustomerByTotalOrders(req.query.limit as unknown as number || 3);
        successResponse(res, "Successfully fetched get top customers", results, { total: results.length, page: 1, limit: results.length });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getNewOrders = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getNewOrders(req.query.limit as unknown as number || 5);
        successResponse(res, "Successfully fetched get new orders", results, { total: results.length, page: 1, limit: results.length });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getTopProducts = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getTopProduts(req.query.limit as unknown as number || 5);
        successResponse(res, "Successfully fetched get top products", results, { total: results.length, page: 1, limit: results.length });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getRevenueAndOrdersByMonth = async (req: Request, res: Response) => {
    try {
        const results = await dashboardService.getRevenueAndOrdersByMonth();
        singleResponse(res, "Successfully fetched get revenue and orders by month", results);
    } catch (error) {
        errorResponse(res, error);
    }
}



