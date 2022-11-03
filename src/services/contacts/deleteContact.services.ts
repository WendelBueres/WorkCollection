import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const deleteContactService = async (id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id });

  await contactRepository.delete(contact!);
};

export default deleteContactService;
