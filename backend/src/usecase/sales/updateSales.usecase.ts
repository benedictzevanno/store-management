import prisma from "../../lib/prisma.js";
import type { UpdateSalesDTO } from "../../dtos/sales.dto.js";
import { executeGetSalesById } from "./getSalesById.usecase.js";

export const executeUpdateSales = async (
  id: number,
  data: UpdateSalesDTO,
) => {
  const existingSales = await executeGetSalesById(id);

  if (!existingSales) return null;

  return prisma.sales.update({
    where: { id },
    data: {
      ...data,
      updatedBy: 1, // Placeholder for auth
    },
  });
};