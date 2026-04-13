import type { Request, Response, NextFunction} from 'express';
import { ApiResponse } from '../utils/apiResponse.js';

import { executeGetItemById } from '../usecase/item/getItemById.usecase.js';
import { executeUpdateItem } from '../usecase/item/updateItem.usecase.js';
import { executeDeleteItem } from '../usecase/item/deleteItem.usecase.js';
import { executeCreateItem } from '../usecase/item/createItem.usecase.js';
import { executeGetItems } from '../usecase/item/getItems.usecase.js';

export const createItem = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const newItem = await executeCreateItem(req.body);
        res
        .status(201)
        .json(new ApiResponse(201, 'Item created successfully', newItem));
    } catch (error) {
        next(error);
    }
};

export const getItems = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const paginationData = await executeGetItems(page, limit);
        res
        .status(200)
        .json(
            new ApiResponse(200, 'Items retrieved successfully', paginationData),
        );
    } catch (error) {
        next(error);
    }
};

export const getItemById = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const item = await executeGetItemById(id);

        if (!item) {
            res.status(404).json(new ApiResponse(404, 'Item not found'));
            return;
        }

        res
        .status(200)
        .json(new ApiResponse(200, 'Item retrieved successfully', item));
    } catch (error) {
        next(error);
    }
};

export const updateItem = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const updatedItem = await executeUpdateItem(id, req.body);

        if (!updatedItem) {
            res.status(404).json(new ApiResponse(404, 'Item not found'));
            return;
        }

        res
        .status(200)
        .json(new ApiResponse(200, 'Item updated successfully', updatedItem));
    } catch (error) {
        next(error);
    }
};

export const deleteItem = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const deletedItem = await executeDeleteItem(id);

        if (!deletedItem) {
            res.status(404).json(new ApiResponse(404, 'Item not found'));
            return;
        }

        res
        .status(200)
        .json(new ApiResponse(200, 'Item deleted successfully', deletedItem));
    } catch (error) {
        next(error);
    }
};
