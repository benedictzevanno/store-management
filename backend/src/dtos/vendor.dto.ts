import {z} from 'zod';

export const CreateVendorSchema = z.object({
  vendorName: z.string().min(1, "Vendor name is required").max(255),
  description: z.string().max(255).optional(),
  contactInfo: z.string().min(1, "Contact info is required").max(255),
});

export const UpdateVendorSchema = CreateVendorSchema.partial();

export type CreateVendorDTO = z.infer<typeof CreateVendorSchema>;
export type UpdateVendorDTO = z.infer<typeof UpdateVendorSchema>;