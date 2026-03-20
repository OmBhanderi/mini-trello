import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/jwt.utils";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decoded = verifyJwtToken(req);

    req.user = { ...decoded };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
