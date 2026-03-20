import { type Request, type Response } from "express";
import { signupService, loginService } from "./auth.service";
import { parseExpiryToSeconds } from "../../common/utils/time.utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await signupService(req.body);

    res.json({ user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: null });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);

    const { token, ...rest } = result.data;
    const expiryTime = parseExpiryToSeconds(process.env.JWT_EXPIRATION_TIME!);
    res.cookie("token", result.data.token, {
      httpOnly: true,
      maxAge: expiryTime * 1000,
      path: "/",
    });

    res.json(rest);
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message, data: null });
  }
};
