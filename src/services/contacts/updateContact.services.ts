import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const updateContactService = async (data: any, id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contactExists = await contactRepository.findOneBy({ id: id });

  if (!contactExists) {
    throw new AppError("contact not found", 404);
  }

  contactRepository.update(id, data);
  const update = await contactRepository.findOneBy({ id: id });

  return update;
};

export default updateContactService;
