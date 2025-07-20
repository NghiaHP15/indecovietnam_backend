import { Request, Response } from "express";
import * as blogCategoryService from "../services/blogCategory.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllBlogCategories = async (req: Request, res: Response) => {
    try {
        const results = await blogCategoryService.getAllBlogCategories(req.query);
        successResponse(res, "Successfully fetched all blog categories", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getBlogCategoryById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await blogCategoryService.getBlogCategoryById(id);
        singleResponse(res, "Blog category found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createBlogCategory = async (req: Request, res: Response) => {
    try {
        const result = await blogCategoryService.CreateBlogCategory(req.body);
        singleResponse(res, "Blog category created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateBlogCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await blogCategoryService.updateBlogCategory(id, req.body);
        singleResponse(res, "Blog category updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteBlogCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await blogCategoryService.deleteProductCategory(id);
        singleResponse(res, "Blog category deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
