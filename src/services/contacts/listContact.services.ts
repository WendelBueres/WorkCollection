import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

const listContactService = async () => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const list = await contactRepository.find();

  return list;
};

export default listContactService;
