import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors";
import { ITechsRequest } from "../../interfaces/techs";

const updateTechService = async (id: string, data: ITechsRequest) => {
  const TechRepository = AppDataSource.getRepository(Tech);

  const searchTech = await TechRepository.findOneBy({ id });
  if (!searchTech) {
    throw new AppError("id is read only", 400);
  }
  await TechRepository.update(id, {
    name: data.name ? data.name : searchTech.name
  });

  const TechUpdated = await TechRepository.findOneBy({ id });

  return TechUpdated!;
};

export default updateTechService;
