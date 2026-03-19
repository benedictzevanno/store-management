import prisma from '../../lib/prisma.js';

export const executeGetVendorById = async (id: number) => {
  return prisma.vendor.findFirst({
    where: { id, deletedAt: null },
  });
};
