import { Request, Response } from "express";
import * as menuService from "../services/menu.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";

export const getAllMenus = async (req: Request, res: Response) => {
    try {
        const results = await menuService.getAllMenus(req.query);
        successResponse(res, "Successfully fetched all menu ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getMenuById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await menuService.getMenuById(id);
        singleResponse(res, "Menu found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createMenu = async (req: Request, res: Response) => {
    try {
        const result = await menuService.createMenu(req.body);
        singleResponse(res, "Menu created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateMenu = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await menuService.updateMenu(id, req.body);
        singleResponse(res, "Menu updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteMenu = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await menuService.deleteMenu(id);
        singleResponse(res, "Menu deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
