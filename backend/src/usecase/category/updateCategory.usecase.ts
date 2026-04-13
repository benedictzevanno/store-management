import prisma from "../../lib/prisma.js";
import type { UpdateCategoryDTO } from "../../dtos/category.dto.js";
import { executeGetCategoryById } from "./getCategoryById.usecase.js";

export const executeUpdateCategory = async (id: number, data: UpdateCategoryDTO) => {
    const existingCategory = await executeGetCategoryById(id);
    
    if (!existingCategory) return null;

    return prisma.category.update({
        where: { id },
        data: {
            ...data,
            updatedBy: 1,
        },
    });
}