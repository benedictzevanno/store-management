import { z } from 'zod';

export const CreateSalesSchema = z.object({
  itemId: z.number().int().positive('Item ID must be a positive integer'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  price : z.number().int().positive('Price must be a positive number'),
});

export const UpdateSalesSchema = CreateSalesSchema.partial();

export type CreateSalesDTO = z.infer<typeof CreateSalesSchema>;
export type UpdateSalesDTO = z.infer<typeof UpdateSalesSchema>;