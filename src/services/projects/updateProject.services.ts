import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors";

const updateProjectService = async (id: string, userId: string, data: any) => {
  const projectRepository = AppDataSource.getRepository(Project);

  const projectExist = await projectRepository.findOneBy({ id: id });

  if (!projectExist) {
    throw new AppError("project not found", 404);
  }

  if (projectExist.userId !== userId) {
    throw new AppError("user does not have permission");
  }

  if (data.id) {
    throw new AppError("id is read only");
  }

  if (data.userId) {
    throw new AppError("id is read only");
  }

  await projectRepository.update(id, data);

  const projectUpdated = await projectRepository.findOneBy({ id: id });

  return projectUpdated;
};

export default updateProjectService;
