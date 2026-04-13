import type { Request, Response, NextFunction} from 'express';
import { ApiResponse } from '../utils/apiResponse.js';

import { executeCreateCategory } from '../usecase/category/createCategory.usecase.js';
import { executeGetCategoryById } from '../usecase/category/getCategoryById.usecase.js';
import { executeGetCategories } from '../usecase/category/getCategories.usecase.js';
import { executeUpdateCategory } from '../usecase/category/updateCategory.usecase.js';
import { executeDeleteCategory } from '../usecase/category/deleteCategory.usecase.js';

export const createCategory = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try { 
        const newCategory = await executeCreateCategory(req.body);
        res
            .status(201)
            .json(new ApiResponse(201, 'Category created successfully', newCategory));
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const paginationData = await executeGetCategories(page, limit);
        res 
            .status(200)
            .json(new ApiResponse(200, 'Categories retrieved successfully', paginationData),
        );
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const category = await executeGetCategoryById(id);

        if (!category) {
            res.status(404).json(new ApiResponse(404, 'Category not found'));
            return;
        } 
        res 
        .status(200)
        .json(new ApiResponse(200, 'Category retrieved successfully', category),
    );
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const updatedCategory = await executeUpdateCategory(id, req.body);
        
        if (!updatedCategory) {
            res.status(404).json(new ApiResponse(404, 'Category not found'));
            return;
        }
        res 
        .status(200)
        .json(new ApiResponse(200, 'Category updated successfully', updatedCategory),
    );
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id as string);
        const deleted = await executeDeleteCategory(id);

        if (!deleted) {
            res.status(404).json(new ApiResponse(404, 'Category not found and cannot be deleted'));
            return;
        }
        res
        .status(200)
        .json(new ApiResponse(200, 'Category deleted successfully'),
    );
    } catch (error) {
        next(error);
    }
};