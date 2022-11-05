import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserLogin } from "../../interfaces/user";

const createSessionServices = async (data: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  if (!data.email) {
    throw new AppError("email is a field required");
  }

  if (!data.password) {
    throw new AppError("password is a field required");
  }

  const user = await userRepository.findOneBy({ email: data.email });

  if (!user) {
    throw new AppError("user or password invalid");
  }

  const checkPassword = await compare(data.password, user.password);

  if (!checkPassword) {
    throw new AppError("user or password invalid");
  }

  const token = jwt.sign(
    {
      isAdm: user.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "18h",
      subject: user.id,
    }
  );

  return { token: token };
};

export default createSessionServices;
