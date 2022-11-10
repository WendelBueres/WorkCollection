import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const { contact } = findUser;

  await userRepository.delete(id);
  await contactRepository.delete(contact.id);

  return "User deleted with sucess!";
};

export default deleteUserService;
