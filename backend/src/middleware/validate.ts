import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import{ ZodType } from 'zod';
import { ApiResponse } from '../utils/apiResponse.js';

export const validateDTO = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map(e => ({ field: e.path.join('.'), message: e.message }));
        res.status(400).json(new ApiResponse(400, 'Validation failed', details));
        return;
      }
      next(error);
    }
  };
};