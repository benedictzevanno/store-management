import type { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';

import { executeCreateVendor } from '../usecase/vendor/createVendor.usecase.js';
import { executeGetVendors } from '../usecase/vendor/getVendors.usecase.js';
import { executeGetVendorById } from '../usecase/vendor/getVendorById.usecase.js';
import { executeUpdateVendor } from '../usecase/vendor/updateVendor.usecase.js';
import { executeDeleteVendor } from '../usecase/vendor/deleteVendor.usecase.js';

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newVendor = await executeCreateVendor(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, 'Vendor created successfully', newVendor));
  } catch (error) {
    next(error);
  }
};

export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const paginationData = await executeGetVendors(page, limit);
    res
      .status(200)
      .json(
        new ApiResponse(200, 'Vendors retrieved successfully', paginationData),
      );
  } catch (error) {
    next(error);
  }
};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    const vendor = await executeGetVendorById(id);

    if (!vendor) {
      res.status(404).json(new ApiResponse(404, 'Vendor not found'));
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(200, 'Vendor retrieved successfully', vendor));
  } catch (error) {
    next(error);
  }
};

export const updateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    const updatedVendor = await executeUpdateVendor(id, req.body);

    if (!updatedVendor) {
      res.status(404).json(new ApiResponse(404, 'Vendor not found'));
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(200, 'Vendor updated successfully', updatedVendor));
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = parseInt(req.params.id as string);
    const isDeleted = await executeDeleteVendor(id);

    if (!isDeleted) {
      res
        .status(404)
        .json(new ApiResponse(404, 'Vendor not found or already deleted'));
      return;
    }

    res.status(200).json(new ApiResponse(200, 'Vendor deleted successfully'));
  } catch (error) {
    next(error);
  }
};
