import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const updateContactService = async (data: any, id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (data.id) {
    throw new AppError("id is read only");
  }

  const contactRepository = AppDataSource.getRepository(Contact);
  await contactRepository.update(user.contact.id, data);
  user = await userRepository.findOneBy({ id: id });
  if (user) {
    return user.contact;
  }
};

export default updateContactService;
