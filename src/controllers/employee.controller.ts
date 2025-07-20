import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";
import { errorResponse, singleResponse, successResponse } from "../utils/response";

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const results = await employeeService.getAllEmployees(req.query);
        successResponse(res, "Successfully fetched all employee ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getEmployeeById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await employeeService.getEmployeeById(id);
        singleResponse(res, "Employee found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getEmployeeByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    try {
        const result = await employeeService.getEmployeeByEmail(email);
        singleResponse(res, "Employee found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}


export const createEmployee = async (req: Request, res: Response) => {
    try {
        const result = await employeeService.createEmployee(req.body);
        singleResponse(res, "Employee created", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await employeeService.updateEmployee(id, req.body);
        singleResponse(res, "Employee updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await employeeService.deleteEmployee(id);
        singleResponse(res, "Product deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}
