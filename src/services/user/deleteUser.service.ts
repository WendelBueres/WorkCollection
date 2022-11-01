import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async(id: string): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({id})

    if(!findUser){
        throw new AppError("User not found", 404)
    }
    
    const deleteUser = await userRepository
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: id })
    .execute()
   
};

export default deleteUserService;