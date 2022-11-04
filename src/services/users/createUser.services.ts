import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserRequest } from "../../interfaces/user";
import { Contact } from "../../entities/contact.entity";

const createUserService = async ({
  name,
  email,
  password,
  image,
  bio,
  contact,
}: IUserRequest) => {
  if (!name) {
    throw new AppError("name is a field required");
  }

  if (!email) {
    throw new AppError("email is a field required");
  }

  if (!bio) {
    throw new AppError("bio is a field required");
  }

  if (!password) {
    throw new AppError("password is a field required");
  }

  const userRepository = AppDataSource.getRepository(User);
  const emailAlreadyExists = await userRepository.findOneBy({ email: email });

  if (emailAlreadyExists) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await hash(password, 10);

  const contactRepository = AppDataSource.getRepository(Contact);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    image,
    bio,
    contact,
  });

  user.contact = contactRepository.create(user.contact);
  user.contact = await contactRepository.save(user.contact);

  await userRepository.save(user);

  return user;
};

export default createUserService;
