import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors";

const deleteContactService = async (id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id });

  if (!contact) {
    throw new AppError("Contact not Found", 404);
  }

  await contactRepository.delete(id);

  return "Contact deleted with sucess!";
};

export default deleteContactService;
