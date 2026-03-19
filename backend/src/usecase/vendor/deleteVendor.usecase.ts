import prisma from '../../lib/prisma.js';
import { executeGetVendorById } from './getVendorById.usecase.js';

export const executeDeleteVendor = async (id: number) => {
  const existingVendor = await executeGetVendorById(id);

  if (!existingVendor) return false;

  await prisma.vendor.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      deletedBy: 1,
    },
  });

  return true;
};
