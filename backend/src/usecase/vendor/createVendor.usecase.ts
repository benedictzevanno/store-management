import prisma from '../../lib/prisma.js';
import type { CreateVendorDTO } from '../../dtos/vendor.dto.js';

export const executeCreateVendor = async (data: CreateVendorDTO) => {
  return prisma.vendor.create({
    data: {
      ...data,
      createdBy: 1, // Placeholder for auth
    },
  });
};
