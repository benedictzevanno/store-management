import prisma from "../../lib/prisma.js";
import type { CreateItemDTO } from "../../dtos/item.dto.js";

export const executeCreateItem = async (data: CreateItemDTO) => {
    return prisma.item.create({
        data: {
            ...data,
            createdBy: 1, // Placeholder for auth
        },
    });
}