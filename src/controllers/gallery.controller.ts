import { Request, Response } from "express";
import * as galleryService from "../services/gallery.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";

export const getAllGalleries = async (req: Request, res: Response) => {
    try {
        const results = await galleryService.getAllGalleries(req.query);
        successResponse(res, "Successfully fetched all gallery ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getGalleryById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await galleryService.getGalleryById(id);
        singleResponse(res, "Gallery found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createGallery = async (req: Request, res: Response) => {
    try {
        const result = await galleryService.createGallery(req.body);
        singleResponse(res, "Gallery created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateGallery = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await galleryService.updateGallery(id, req.body);
        singleResponse(res, "Gallery updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteGallery = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await galleryService.deleteGallery(id);
        singleResponse(res, "Gallery deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
