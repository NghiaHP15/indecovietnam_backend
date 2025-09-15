import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const results = await productService.getAllProducts(req.query);
        successResponse(res, "Successfully fetched all product ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productService.getProductById(id);
        singleResponse(res, "Product found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getProductBySlug = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    try {
        const result = await productService.getProductBySlug(slug);
        singleResponse(res, "Product found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const result = await productService.CreateProduct(req.body);
        singleResponse(res, "Product created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productService.updaterProduct(id, req.body);
        singleResponse(res, "Product updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productService.deleteProduct(id);
        singleResponse(res, "Product deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const viewProduct = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await productService.viewProduct(id);
        singleResponse(res, "Product viewed", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
