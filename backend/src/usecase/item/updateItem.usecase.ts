import prisma from '../../lib/prisma.js';
import { executeGetItemById } from './getItemById.usecase.js';
import type { UpdateItemDTO } from '../../dtos/item.dto.js';

export const executeUpdateItem = async (id: number, data: UpdateItemDTO) => {
    const existingItem = await executeGetItemById(id);
    if (!existingItem) {
        throw new Error('Item not found');
    }

    return prisma.item.update({
        where: { id },
        data: {
            ...data,
            updatedBy: 1, // Placeholder for auth
        },
    });
}