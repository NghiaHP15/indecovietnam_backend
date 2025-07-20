import { Request, Response } from "express";
import * as siteSettingSevicer from "../services/siteSetting.service";
import { errorResponse, singleResponse, successResponse } from "../utils/response";

export const getAllSiteSettings = async (req: Request, res: Response) => {
    try {
        const results = await siteSettingSevicer.getAllSiteSettings(req.query);
        successResponse(res, "Successfully fetched all site setting", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getSiteSettingById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await siteSettingSevicer.getSiteSettingById(id);
        singleResponse(res, "Room site setting found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createSiteSetting = async (req: Request, res: Response) => {
    try {
        const result = await siteSettingSevicer.CreateSiteSetting(req.body);
        singleResponse(res, "Room category created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateSiteSetting = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await siteSettingSevicer.updateSiteSetting(id, req.body);
        singleResponse(res, "Site setting updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteSiteSetting = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await siteSettingSevicer.deleteSiteSetting(id);
        singleResponse(res, "Site setting deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
