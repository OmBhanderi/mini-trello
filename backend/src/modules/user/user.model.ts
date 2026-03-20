import { AppDataSource } from "../../config/data-source";
import { User } from "./user.entity";

const userRepo = AppDataSource.getRepository(User);

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export const createUser = (data: CreateUserProps) => {
  return userRepo.save(data);
};

export const findUserByEmail = (email: string) => {
  return userRepo.findOne({
    where: { email },
  });
};

export const findUserById = (id: string) => {
  return userRepo.findOne({
    where: { id },
  });
};