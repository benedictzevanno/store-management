import prisma from '../../lib/prisma.js';

export const executeGetCategoryById = async (id: number) => {
    return prisma.category.findFirst({
        where: { id, deletedAt: null },
    });
    }