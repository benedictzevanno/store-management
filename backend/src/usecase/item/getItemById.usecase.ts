import prisma from "../../lib/prisma.js";

export const executeGetItemById = async (id: number) => {
    return prisma.item.findUnique({
        where: { id },
    });
}