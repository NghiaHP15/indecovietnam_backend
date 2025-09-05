import { Router, Request, Response } from "express";
import * as notificationService from "../services/notification.service";
import { errorResponse, singleResponse, successResponse } from "../utils/response";

export const getUnread = async (req: Request, res: Response) => {
    try {
        const results = await notificationService.getUnread(req.query);
        successResponse(res, "Successfully fetched all menu ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const markAsRead = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const results = await notificationService.markAsRead(id);
        singleResponse(res, "Successfully fetched all menu ", results);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const readAll = async (req: Request, res: Response) => {
    try {
        const results = await notificationService.readAll();
        singleResponse(res, "Successfully fetched all menu ", results);
    } catch (error) {
        errorResponse(res, error);
    }
}
