import prisma from '../../lib/prisma.js';

export const executeGetVendors = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const whereCondition = { deletedAt: null };

  const [vendors, totalItems] = await Promise.all([
    prisma.vendor.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { id: 'desc' },
    }),
    prisma.vendor.count({ where: whereCondition }),
  ]);

  return {
    vendors,
    meta: {
      totalItems,
      itemCount: vendors.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    },
  };
};
