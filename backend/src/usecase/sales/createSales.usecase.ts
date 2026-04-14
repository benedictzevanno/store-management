import prisma from '../../lib/prisma.js';
import type { CreateSalesDTO } from '../../dtos/sales.dto.js';

export const executeCreateSales = async (data: CreateSalesDTO) => {
  return prisma.$transaction(async (trans) => {
    const item = await trans.item.findUnique({
      where: { id: data.itemId },
      select: {
        id: true,
        quantity: true,
        buyPrice: true,
        sellPrice: true,
      },
    });

    if (!item) {
      throw new Error('Item not found');
    }

    if (!item.sellPrice) {
      throw new Error('Cannot create sales record: item sell price is not set');
    }

    if (item.quantity < data.quantity) {
      throw new Error('Insufficient stock');
    }

    const sellPrice = Number(item.sellPrice.toString());

    if (sellPrice > data.price) {
      throw new Error('Harga jual (price) harus lebih tinggi dari standar sell price');
    }

    // const sellPrice = Number(item.sellPrice.toString());
    const buyPrice = Number(item.buyPrice.toString());
    const totalAmount = data.price * data.quantity;
    const profit = totalAmount - (buyPrice * data.quantity);

    await trans.item.update({
      where: { id: data.itemId },
      data: {
        quantity: {
          decrement: data.quantity,
        },
        updatedBy: 1, // Placeholder for auth
      },
    });

    return trans.sales.create({
      data: {
        itemId: data.itemId,
        quantity: data.quantity,
        totalAmount,
        profit,
        createdBy: 1, // Placeholder for auth
      },
    });
  });
}