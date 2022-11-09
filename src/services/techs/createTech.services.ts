import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors";
import { ITechsRequest } from "../../interfaces/techs";

const createTechService = async (data: ITechsRequest, id: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const techsRepository = AppDataSource.getRepository(Tech);

  if (!id) {
    throw new AppError("id not found");
  }

  const userExist = await userRepository.findOneBy({ id: id });

  if (!data.name) {
    throw new AppError("name is a field required");
  }

  if (!userExist) {
    throw new AppError(`user not found`);
  }

  let createdTech = techsRepository.create(data);
  createdTech.userId = userExist.id;
  await techsRepository.save(createdTech);

  return createdTech;
};

export default createTechService;
