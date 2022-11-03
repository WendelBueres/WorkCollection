import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const getUsersServices = async () => {
  const usersRepository = AppDataSource.getRepository(User);
  const users = await usersRepository.find({ relations: { contact: true } });

  return users;
};

export default getUsersServices;
