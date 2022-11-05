import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const deleteContactService = async (id: string, contactParam: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: id });
  const contactRepository = AppDataSource.getRepository(Contact);

  if (!userExist) {
    throw new AppError("User not found");
  }

  if (!contactParam) {
    contactRepository
      .createQueryBuilder()
      .update(Contact)
      .set({
        github: null,
        linkedin: null,
        phone: null,
      })
      .where("id = :id", { id: userExist.contact.id })
      .execute();
  }

  if (contactParam === "github") {
    await contactRepository.update(userExist.contact.id, { github: null });
  }

  if (contactParam === "linkedin") {
    await contactRepository.update(userExist.contact.id, {
      linkedin: null,
    });
  }

  if (contactParam === "phone") {
    await contactRepository.update(userExist.contact.id, { phone: null });
  }
};

export default deleteContactService;
