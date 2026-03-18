import type { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import type { CreateVendorDTO, UpdateVendorDTO } from '../dtos/vendor.dto.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: CreateVendorDTO = req.body;
    const newVendor = await prisma.vendor.create({
      data: {
        ...data,
        createdBy: 1 // Placeholder until auth is added
      }
    });
    res.status(201).json(new ApiResponse(201, 'Vendor created successfully', newVendor));
  } catch (error) {
    next(error);
  }
};

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Soft delete rule: only fetch records where deletedAt is null
    const whereCondition = { deletedAt: null };

    const [vendors, totalItems] = await Promise.all([
      prisma.vendor.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { id: 'desc' }
      }),
      prisma.vendor.count({ where: whereCondition })
    ]);

    const paginationData = {
      vendors,
      meta: {
        totalItems,
        itemCount: vendors.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      }
    };

    res.status(200).json(new ApiResponse(200, 'Vendors retrieved successfully', paginationData));
  } catch (error) {
    next(error);
  }
};

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id!);
    const vendor = await prisma.vendor.findFirst({
      // Soft delete rule: ensure we don't fetch a deleted record
      where: { id, deletedAt: null }
    });

    if (!vendor) {
      res.status(404).json(new ApiResponse(404, 'Vendor not found'));
      return;
    }

    res.status(200).json(new ApiResponse(200, 'Vendor retrieved successfully', vendor));
  } catch (error) {
    next(error);
  }
};

export const updateVendor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id!);
    const data: UpdateVendorDTO = req.body;

    // First, verify the record exists and isn't soft-deleted
    const existingVendor = await prisma.vendor.findFirst({ where: { id, deletedAt: null } });
    if (!existingVendor) {
      res.status(404).json(new ApiResponse(404, 'Vendor not found'));
      return;
    }

    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: {
        ...data,
        updatedBy: 1 // Placeholder until auth is added
      },
    });

    res.status(200).json(new ApiResponse(200, 'Vendor updated successfully', updatedVendor));
  } catch (error) {
    next(error);
  }
};

export const deleteVendor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id!);

    // Verify it exists and isn't already deleted
    const existingVendor = await prisma.vendor.findFirst({ where: { id, deletedAt: null } });
    if (!existingVendor) {
      res.status(404).json(new ApiResponse(404, 'Vendor not found or already deleted'));
      return;
    }

    // SOFT DELETE: We update the record instead of actually deleting it
    await prisma.vendor.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: 1 // Placeholder until auth is added
      }
    });

    res.status(200).json(new ApiResponse(200, 'Vendor deleted successfully'));
  } catch (error) {
    next(error);
  }
};