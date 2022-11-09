import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors";
import { ITechsRequest } from "../../interfaces/techs";

const updateTechService = async (id: string, data: any) => {
  const TechRepository = AppDataSource.getRepository(Tech);

  const searchTech = await TechRepository.findOneBy({ id: id });
  if (!searchTech) {
    throw new AppError("technology not found", 404);
  }
  
  if (data.id) {
    throw new AppError("id is read only")
  }

  await TechRepository.update(id, data);

  const TechUpdated = await TechRepository.findOneBy({ id: id });

  return TechUpdated!;
};

export default updateTechService;
