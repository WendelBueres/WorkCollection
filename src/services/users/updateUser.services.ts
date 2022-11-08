import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const updateUserService = async (data: any, id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({id});

  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  
  if(data.id){
    throw new AppError("id is read only", 400);
  }

  if(data.password){
    data.password = await hash(data.password, 10)
  }

  await userRepository.update(id, data)

  const user = await userRepository.findOneBy({id})
    
  return user!;
};

export default updateUserService;