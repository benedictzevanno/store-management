import prisma from "../../lib/prisma.js";

export const executeGetCategories = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const whereCondition = { deletedAt: null };

    const [categories, totalItems] = await Promise.all([
        prisma.category.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: { id: 'desc' },
        }),
        prisma.category.count({ where: whereCondition }),
    ]);

    return {
        categories,
        meta: {
            totalItems,
            itemCount: categories.length,
            itemsPerPage: limit,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        },
    };
}