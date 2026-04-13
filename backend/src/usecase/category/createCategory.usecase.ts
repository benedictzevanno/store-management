import prisma from '../../lib/prisma.js';
import type { CreateCategoryDTO } from '../../dtos/category.dto.js';

export const executeCreateCategory = async (data: CreateCategoryDTO) => {
  return prisma.category.create({
    data: {
      ...data,
      createdBy: 1, // Placeholder for auth
    },
  });
}