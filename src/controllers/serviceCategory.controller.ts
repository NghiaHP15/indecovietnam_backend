import { Request, Response } from "express";
import * as serviceCategory from "../services/serviceCategory.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllServiceCategories = async (req: Request, res: Response) => {
    try {
        const results = await serviceCategory.getAllServiceCategories(req.query);
        successResponse(res, "Successfully fetched all service category", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getServiceCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await serviceCategory.getServiceCategoryById(id);
        singleResponse(res, "Service category found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createServiceCategory = async (req: Request, res: Response) => {
    try {
        const result = await serviceCategory.createServiceCategory(req.body);
        singleResponse(res, "Service category created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateServiceCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await serviceCategory.updateServiceCategory(id, req.body);
        singleResponse(res, "Service category updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteServiceCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await serviceCategory.deleteServiceCategory(id);
        singleResponse(res, "Service category deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
