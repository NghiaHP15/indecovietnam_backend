import { Request, Response } from "express";
import * as roomCategoryService from "../services/roomCategory.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllRoomCategories = async (req: Request, res: Response) => {
    try {
        const results = await roomCategoryService.getAllRoomCategories(req.query);
        successResponse(res, "Successfully fetched all room categories", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getRoomCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await roomCategoryService.getRoomCategoryById(id);
        singleResponse(res, "Room category found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createRoomCategory = async (req: Request, res: Response) => {
    try {
        const result = await roomCategoryService.CreateRoomCategory(req.body);
        singleResponse(res, "Room category created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateRoomCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await roomCategoryService.updateRoomCategory(id, req.body);
        singleResponse(res, "Room category updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteRoomCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await roomCategoryService.deleteRoomCategory(id);
        singleResponse(res, "Room category deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
