import { Request, Response } from "express";
import * as addresService from "../services/address.service";
import { errorResponse, singleResponse, successResponse } from "../utils/response";


export const getAllAddresses = async (req: Request, res: Response) => {
    try {
        const results = await addresService.getAllAddresses(req.query);
        successResponse(res, "Successfully fetched all address", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getAddressById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await addresService.getAddressById(id);
        singleResponse(res, "Address found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createAddress = async (req: Request, res: Response) => {
    try {
        const result = await addresService.CreateAddress(req.body);
        singleResponse(res, "Address created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await addresService.updateAddress(id, req.body);
        singleResponse(res, "Address updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await addresService.deleteAddress(id);
        singleResponse(res, "Address deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
