import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { User } from "../../entities/user.entity";

const createUserService = async ({name, email, password, image, bio}: IUserRequest): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User)

    const hashedPassword = await hash(password, 10)

    const emailAlreadyExists = await userRepository.findOneBy({
        email
    })

    if(emailAlreadyExists){
        throw new AppError("Email already exists", 400)
    }

    const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        image,
        bio
    })

    await userRepository.save(user)

    return user
};

export default createUserService;