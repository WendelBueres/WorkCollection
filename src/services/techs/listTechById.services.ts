import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";

const listTechsByIdServices = async (id: string) => {
  const techsRepository = AppDataSource.getRepository(Tech);

  const tech = await techsRepository.find({
    relations: { projects: true },
  });

  return tech;
};

export default listTechsByIdServices;
