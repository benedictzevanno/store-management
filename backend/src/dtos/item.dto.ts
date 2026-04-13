import { z } from 'zod';

export const CreateItemSchema = z.object({
  itemName: z.string().min(1, 'Item name is required').max(255),
  quantity: z.number().int().nonnegative('Quantity must be a non-negative integer'),
  unit: z.string().min(1, 'Unit is required').max(50),
  buyPrice: z.number().positive('Price must be a positive number'),
  sellPrice: z.number().positive('Price must be a positive number'),
  lowestPrice: z.number().positive('Price must be a positive number'),
  categoryId: z.number().int().positive('Category ID must be a positive integer'),
  vendorId: z.number().int().positive('Vendor ID must be a positive integer'),
});

export const UpdateItemSchema = CreateItemSchema.partial();

export type CreateItemDTO = z.infer<typeof CreateItemSchema>;
export type UpdateItemDTO = z.infer<typeof UpdateItemSchema>;