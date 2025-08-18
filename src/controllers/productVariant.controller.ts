import { Request, Response } from "express";
import * as productVariantService from "../services/productVariant.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllProductVariants = async (req: Request, res: Response) => {
    try {
        const results = await productVariantService.getAllProductVariants(req.query);
        successResponse(res, "Successfully fetched all product variant", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getProductVariantById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productVariantService.getProductVariantById(id);
        singleResponse(res, "Product variant found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createProductVariant = async (req: Request, res: Response) => {
    try {
        const result = await productVariantService.createProductVariant(req.body);
        singleResponse(res, "Product variant created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateProductVarinant = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productVariantService.updaterProductVariant(id, req.body);
        singleResponse(res, "Product variant updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteProductVariant = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productVariantService.deleteProductVariant(id);
        singleResponse(res, "Product variant deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
