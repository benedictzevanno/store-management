import prisma from "../../lib/prisma.js";

export const executeGetSales = async (page: number, limit: number) => {

    const skip = (page - 1) * limit;
    const whereCondition = { deletedAt: null };

    const [sales, totalItems] = await prisma.$transaction([

        prisma.sales.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: { id: 'desc' },
        }),
        prisma.sales.count({ where: whereCondition }),
    ]);

    return { 
        sales,
        meta: {
            totalItems,
            itemCount: sales.length,
            itemsPerPage: limit,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        },
    }
}