import { Request, Response } from "express";
import * as colorService from "../services/color.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";

export const getAllColors = async (req: Request, res: Response) => {
    try {
        const results = await colorService.getAllColors();
        successResponse(res, "Successfully fetched all color", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getColorById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await colorService.getColorById(id);
        singleResponse(res, "Color found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createColor = async (req: Request, res: Response) => {
    try {
        const result = await colorService.createColor(req.body);
        singleResponse(res, "Color created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateColor = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await colorService.updateColor(id, req.body);
        singleResponse(res, "Color updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteColor = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await colorService.deleteColor(id);
        singleResponse(res, "Color deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
