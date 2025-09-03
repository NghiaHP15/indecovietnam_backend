import { Request, Response } from "express";
import * as feedbackService from "../services/feedback.service";
import { successResponse, errorResponse, singleResponse, createError } from "../utils/response";
import { createNoti } from "../services/notification.service";
import { TypeNotification } from "../utils/enum";

export const getAllfeedbacks = async (req: Request, res: Response) => {
    try {
        const results = await feedbackService.getAllFeedbacks(req.query);
        successResponse(res, "Successfully fetched all feedback ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getFeedbackById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await feedbackService.getFeedbackById(id);
        singleResponse(res, "Feedback found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createFeedback = async (req: Request, res: Response) => {
    try {
        const result = await feedbackService.createFeedback(req.body);
        createNoti({
            message: `📞 Bạn có thông báo liên hệ mới`,
            name: result.name,
            avatar: result.avatar,
            type: TypeNotification.CONTACT,
            contact: { id: result.id },
        })
        return singleResponse(res, "Feedback created", result);
    } catch (error) {
        return errorResponse(res, error);
    }
};

export const updateFeedback = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await feedbackService.updateFeedback(id, req.body);
        singleResponse(res, "Feedback updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteFeedback = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await feedbackService.deleteFeedback(id);
        singleResponse(res, "Feedback deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
