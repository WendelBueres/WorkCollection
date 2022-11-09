import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUsersServices = async () => {
  const usersRepository = AppDataSource.getRepository(User);
  const users = await usersRepository.find();

  return users;
};

export default listUsersServices;
