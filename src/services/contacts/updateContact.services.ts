import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const updateContactService = async (id: string, data: any) => {
  console.log("AQUI!!!!", data);
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  console.log("DATA", data);
  const contactRepository = AppDataSource.getRepository(Contact);
  await contactRepository.update(user.contact.id, data);
  user = await userRepository.findOneBy({ id: id });
  if (user) {
    return { message: "update success", contact: user.contact };
  }
};

export default updateContactService;
