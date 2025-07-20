import { Request, Response } from "express";
import * as productCategoryService from "../services/productCategory.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllProductCategories = async (req: Request, res: Response) => {
    try {
        const results = await productCategoryService.getAllProductCategories(req.query);
        successResponse(res, "Successfully fetched all product categories", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getProductCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productCategoryService.getProductCategoryById(id);
        singleResponse(res, "Product category found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createProductCategory = async (req: Request, res: Response) => {
    try {
        const result = await productCategoryService.CreateProductCategory(req.body);
        singleResponse(res, "Product category created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateProductCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productCategoryService.updateProductCategory(id, req.body);
        singleResponse(res, "Product category updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteProductCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productCategoryService.deleteProductCategory(id);
        singleResponse(res, "Product category deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
