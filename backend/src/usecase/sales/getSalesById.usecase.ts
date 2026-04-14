import prisma from '../../lib/prisma.js';

export const executeGetSalesById = async (id: number) => {
  return prisma.sales.findUnique({
    where: { id },
  });
}