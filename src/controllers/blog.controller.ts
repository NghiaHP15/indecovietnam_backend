import { Request, Response } from "express";
import * as blogService from "../services/blog.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const results = await blogService.getAllBlogs(req.query);
        successResponse(res, "Successfully fetched all blog", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getBlogById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await blogService.getBlogById(id);
        singleResponse(res, "Blog found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getBlogBySlug = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    try {
        const result = await blogService.getBlogBySlug(slug);
        singleResponse(res, "Blog found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createBlog = async (req: Request, res: Response) => {
    try {
        const result = await blogService.CreateBlog(req.body);
        singleResponse(res, "Blog created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await blogService.updateBlog(id, req.body);
        singleResponse(res, "Blog updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await blogService.deleteBlog(id);
        singleResponse(res, "Blog deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
