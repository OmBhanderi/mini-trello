import jwt, { type SignOptions } from "jsonwebtoken";

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



