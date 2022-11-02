import AppDataSource from "../data-source";
import { Contact } from "../entities/contact.entity";

const createContactService = async ({ linkedin, github, phone }: Contact) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = new Contact();
  contact.linkedin = linkedin;
  contact.github = github;
  contact.phone = phone;

  contactRepository.create(contact);

  await contactRepository.save(contact);
  return contact;
};

export default createContactService;
