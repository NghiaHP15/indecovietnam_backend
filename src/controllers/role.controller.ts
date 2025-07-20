import { Request, Response } from "express";
import * as roleService from "../services/role.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const results = await roleService.getAllRoles(req.query);
        successResponse(res, "Successfully fetched all role", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getRoleById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await roleService.getRoleById(id);
        singleResponse(res, "Role found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createRole = async (req: Request, res: Response) => {
    try {
        const result = await roleService.createRole(req.body);
        singleResponse(res, "Role created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateRole = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await roleService.updateRole(id, req.body);
        singleResponse(res, "Role updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await roleService.deleteRole(id);
        singleResponse(res, "Role deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
