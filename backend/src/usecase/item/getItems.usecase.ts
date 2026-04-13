import prisma from "../../lib/prisma.js";

export const executeGetItems = async (page: number, limit: number) => {
    const skip = (page - 1) * limit; 
    const whereCondition = { deletedAt: null };
    
    const [items, totalItems] = await Promise.all([
        prisma.item.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: { id: 'desc' },
        }),
        prisma.item.count({ where: whereCondition }),
    ]);

    return {
        items,
        meta: {
            totalItems,
            itemCount: items.length,
            itemsPerPage: limit,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        },
    };
};