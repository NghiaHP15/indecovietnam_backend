import { Request, Response } from "express";
import * as policyService from "../services/policy.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllPolicies = async (req: Request, res: Response) => {
    try {
        const results = await policyService.getAllPolicies(req.query);
        successResponse(res, "Successfully fetched all policies", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getPolicyById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await policyService.getPolicyById(id);
        singleResponse(res, "Policy found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getPolicyBySlug = async (req: Request, res: Response) => {
    const slug = req.params.slug;
    try {
        const result = await policyService.getPolicyBySlug(slug);
        singleResponse(res, "Policy found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createPolicy = async (req: Request, res: Response) => {
    try {
        const result = await policyService.createPolicy(req.body);
        singleResponse(res, "Policy created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updatePolicy = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await policyService.updatePolicy(id, req.body);
        singleResponse(res, "Policy updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deletePolicy = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await policyService.deletePolicy(id);
        singleResponse(res, "Policy deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
