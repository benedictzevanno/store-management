import prisma from '../../lib/prisma.js';
import type { UpdateVendorDTO } from '../../dtos/vendor.dto.js';
import { executeGetVendorById } from './getVendorById.usecase.js';

export const executeUpdateVendor = async (
  id: number,
  data: UpdateVendorDTO,
) => {
  const existingVendor = await executeGetVendorById(id);

  if (!existingVendor) return null;

  return prisma.vendor.update({
    where: { id },
    data: {
      ...data,
      updatedBy: 1,
    },
  });
};
