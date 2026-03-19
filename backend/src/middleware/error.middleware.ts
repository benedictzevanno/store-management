import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '../generated/prisma/client.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(
    `[Error] ${req.method} ${req.path} >> StatusCode:: ${err.statusCode || 500}, Message:: ${err.message}`,
  );

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      message = `Duplicate entry. A record with that ${err.meta?.target} already exists.`;
    } else if (err.code === 'P2025') {
      statusCode = 404;
      message = 'The requested record was not found in the database.';
    }
  }

  const errorData =
    process.env.NODE_ENV !== 'production' ? { stack: err.stack } : undefined;
  res.status(statusCode).json(new ApiResponse(statusCode, message, errorData));
};
