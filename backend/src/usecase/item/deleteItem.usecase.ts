import prisma from '../../lib/prisma.js';
import { executeGetItemById } from './getItemById.usecase.js';

export const executeDeleteItem = async (id: number) => {
  const existingItem = await executeGetItemById(id);
  if (!existingItem) {
    throw new Error('Item not found');
  }

  return prisma.item.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      deletedBy: 1,
    },
  });
};
