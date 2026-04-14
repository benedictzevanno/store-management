import type { Request, Response, NextFunction} from 'express';
import { ApiResponse } from '../utils/apiResponse.js';

import { executeGetSalesById } from '../usecase/sales/getSalesById.usecase.js';
import { executeUpdateSales } from '../usecase/sales/updateSales.usecase.js';
import { executeCreateSales } from '../usecase/sales/createSales.usecase.js';
import { executeDeleteSales } from '../usecase/sales/deleteSales.usecase.js';
import { executeGetSales } from '../usecase/sales/getSales.usecase.js';

export const createSales = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const newSales = await executeCreateSales(req.body);
        res
        .status(201)
        .json(new ApiResponse(201, 'Sales created successfully', newSales));
    } catch (error) {
        next(error);
    }
};

export const getSales = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const paginationData = await executeGetSales(page, limit);
        res
        .status(200)
        .json(
            new ApiResponse(200, 'Sales retrieved successfully', paginationData),
        );
    } catch (error) {
        next(error);
    }
};

export const getSalesById = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const sales = await executeGetSalesById(id);

        if (!sales) {
            res.status(404).json(new ApiResponse(404, 'Sales not found'));
            return;
        }

        res
        .status(200)
        .json(new ApiResponse(200, 'Sales retrieved successfully', sales));
    } catch (error) {
        next(error);
    }
};

export const updateSales = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const updatedSales = await executeUpdateSales(id, req.body);

        if (!updatedSales) {
            res.status(404).json(new ApiResponse(404, 'Sales not found'));
            return;
        }

        res
        .status(200)
        .json(new ApiResponse(200, 'Sales updated successfully', updatedSales));
    } catch (error) {
        next(error);
    }
};

export const deleteSales = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const deleted = await executeDeleteSales(id);

        if (!deleted) {
            res.status(404).json(new ApiResponse(404, 'Sales not found'));
            return;
        }

        res
        .status(200)
        .json(new ApiResponse(200, 'Sales deleted successfully', null));
    } catch (error) {
        next(error);
    }
};
