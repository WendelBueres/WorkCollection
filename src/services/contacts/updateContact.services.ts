import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors";
import { IContactRequest } from "../../interfaces/contact";

const updateContactService = async (id: string, data: any) => {
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contactRepository = AppDataSource.getRepository(Contact);
  await contactRepository.update(user.contact.id, data);
  user = await userRepository.findOneBy({ id: id });
  if (user) {
    return { message: "update success", contact: user.contact };
  }
};

export default updateContactService;
