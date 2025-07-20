import { Request, Response } from "express";
import * as customerService from "../services/customer.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";


export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await customerService.getAllCustomers(req.query);
        successResponse(res, "Successfully fetched all customers", customers, { total: customers.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getCustomerById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const customer = await customerService.getCustomerById(id);
        singleResponse(res, "Customer found", customer);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getCustomerByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    try {
        const customer = await customerService.getCustomerByEmail(email);
        singleResponse(res, "Customer found", customer);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await customerService.createCustomer(req.body);
        singleResponse(res, "Customer created", customer);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const customer = await customerService.updateCustomer(id, req.body);
        singleResponse(res, "Customer updated", customer);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const customer = await customerService.deleteCustomer(id);
        singleResponse(res, "Customer deleted", customer);
    } catch (error) {
        errorResponse(res, error);
    }
}
