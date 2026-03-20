import { AppDataSource } from "../../config/data-source";
import { User } from "./user.entity";

const userRepo = AppDataSource.getRepository(User);

type CreateUserProps = Pick<User, "name" | "email" | "password">
type findUserByEmailProps = Pick<User, "email">;
type findUserByIdProps = Pick<User, "id">

export const createUser = (data : CreateUserProps) => {
  return userRepo.save(data);
};

export const findUserByEmail = ({email}: findUserByEmailProps) => {
  return userRepo.findOne({ where: { email } });
};

export const findUserById = ({id}: findUserByIdProps) => {
  return userRepo.findOne({ where: { id } });
};
