import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const listUsersByIdServices = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = await usersRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("user not found");
  }

  return user;
};

export default listUsersByIdServices;
