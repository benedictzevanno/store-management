import prisma from "../../lib/prisma.js";
import { executeGetCategoryById } from "./getCategoryById.usecase.js";

export const executeDeleteCategory = async (id: number) => {
    const existingCategory = await executeGetCategoryById(id);

    if (!existingCategory) return false;

    await prisma.category.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            deletedBy: 1,
        },
    });

    return true;
}