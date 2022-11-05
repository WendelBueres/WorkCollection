import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors";
import { IProjectRequest } from "../../interfaces/projects";

const updateProjectService = async (id: string, data: any) => {
  const projectRepository = AppDataSource.getRepository(Project);

  const projectExist = await projectRepository.findOneBy({ id: id });
  if (!projectExist) {
    throw new AppError("project not found", 404);
  }

  if (data.id) {
    throw new AppError("id is only ready");
  }

  await projectRepository.update(id, data);

  const projectUpdated = await projectRepository.findOneBy({ id: id });

  return projectUpdated;
};

export default updateProjectService;
