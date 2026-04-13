import { z } from 'zod';

export const CreateCategorySchema = z.object({
  categoryName: z.string().min(1, 'Category name is required').max(255),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;