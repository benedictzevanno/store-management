import type { Express, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import itemRoutes from './routes/item.routes.js';
import vendorRoutes from './routes/vendor.routes.js';
import { globalErrorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Routes
app.use('/api/items', itemRoutes);
app.use('/api/vendors', vendorRoutes);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Global Error Handler (Must be last)
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
