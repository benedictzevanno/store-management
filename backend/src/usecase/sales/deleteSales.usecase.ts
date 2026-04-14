import prisma from '../../lib/prisma.js';
import { executeGetSalesById } from './getSalesById.usecase.js';

export const executeDeleteSales = async (id: number) => {

    const existingSales = await executeGetSalesById(id);
    
    if (!existingSales) return false;

    await prisma.sales.update({
        where: { id },
        data: {
            deletedAt: new Date(),
            deletedBy: 1,
        },
    });

    return true;
}