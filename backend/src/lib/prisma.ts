import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

// 1. Initialize the adapter with your database URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// 2. Pass the adapter into the Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma;
