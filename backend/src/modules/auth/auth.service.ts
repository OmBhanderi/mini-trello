import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../user/user.model";
import { signJwtToken } from "../../common/utils/jwt.utils";
import { LoginDto, SignupDto } from "../user/user.validation";
import { LoginResponseDto, SignupResponseDto } from "./auth.dto";

export const signupService = async (
  data: SignupDto,
): Promise<SignupResponseDto> => {
  const { name, email, password } = data;
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: true,
    message: "SignIn sucessfully",
    data: {
      name: user.name,
      email: user.email,
    },
  };
};

export const loginService = async (
  data: LoginDto,
): Promise<LoginResponseDto> => {
  const { email, password } = data;
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signJwtToken({ id: user.id });

  return {
    success: true,
    message: "LogIn sucessfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    },
  };
};
