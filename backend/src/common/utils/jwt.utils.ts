import jwt, { type SignOptions } from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth.middelware";
import { Response } from "express";

type signJwtTokenProps = {
  id: string;
};

export function signJwtToken(id: signJwtTokenProps) {
  const jwt_secret = process.env.JWT_SECRET ?? "jwt_secret";
  const jwt_expiry = process.env.JWT_EXPIRATION_TIME ?? "7d";
  const token = jwt.sign(id, jwt_secret, {
    expiresIn: jwt_expiry,
  } as SignOptions);
  return token;
}

export function verifyJwtToken(req: AuthRequest) {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  const token = req.cookies.token;

  if (!token) {
    if (!token) throw new Error("Unauthorized");;
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  return decoded;
}
