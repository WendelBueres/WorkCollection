import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const updateUserService = async (data: any, id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: id });

  if (!userExist) {
    throw new AppError("User not found");
  }

  if (data.id) {
    throw new AppError("id is read only");
  }

  await userRepository.update(id, data);
  const update = await userRepository.findOneBy({ id: id });

  return update;
};

export default updateUserService;
