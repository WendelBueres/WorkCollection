import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors";
import { IContactRequest } from "../../interfaces/contact";

const updateContactService = async (
  { linkedin, github, phone, userId }: IContactRequest,
  id: string
): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({ id: userId });

  if (!findContact) {
    throw new AppError("contact not found", 404);
  }

  await contactRepository.update(id, {
    linkedin: linkedin ? linkedin : findContact.linkedin,
    github: github ? github : findContact.github,
    phone: phone ? phone : findContact.phone,
  });

  const contact = await contactRepository.findOneBy({ id: userId });

  return contact!;
};

export default updateContactService;
