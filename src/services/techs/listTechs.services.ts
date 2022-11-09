import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";

const listTechsService = async () => {
  const techsRepository = AppDataSource.getRepository(Tech);

  const list = await techsRepository.find();

  return list;
};

export default listTechsService;
