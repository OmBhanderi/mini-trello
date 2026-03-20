import { Router } from "express";
import { signup, login } from "./auth.controller";
import { loginSchema, signupSchema } from "../user/user.validation";
import { validate } from "../../common/middleware/validate.middleware";

const router = Router();

router.post("/signup",validate(signupSchema), signup);


router.post("/login", validate(loginSchema),login);



export default router;
