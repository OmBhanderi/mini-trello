import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // overwrite with validated data
      next();
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.errors?.[0]?.message || err.message,
        data: null,
      });
    }
  };