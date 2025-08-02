import { Request, Response } from "express";
import * as serviceService from "../services/service.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllServices = async (req: Request, res: Response) => {
    try {
        const results = await serviceService.getAllServices(req.query);
        successResponse(res, "Successfully fetched all service", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getServiceById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await serviceService.getServiceById(id);
        singleResponse(res, "Service found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getServiceBySlug = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    try {
        const result = await serviceService.getServiceBySlug(slug);
        singleResponse(res, "Service found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createService = async (req: Request, res: Response) => {
    try {
        const result = await serviceService.createService(req.body);
        singleResponse(res, "Service created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateService = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await serviceService.updateService(id, req.body);
        singleResponse(res, "Service updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteService = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await serviceService.deleteService(id);
        singleResponse(res, "Service deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
