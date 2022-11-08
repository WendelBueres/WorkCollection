import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";

const listProjectsService = async () => {
  const projectRepository = AppDataSource.getRepository(Project);

  const list = await projectRepository.find({ relations: { techs: true } });

  return list;
};

export default listProjectsService;
