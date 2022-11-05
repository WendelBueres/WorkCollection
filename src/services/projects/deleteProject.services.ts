import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors";

const deleteProjectService = async (id: string) => {
  const projectRepository = AppDataSource.getRepository(Project);

  const searchProject = await projectRepository.findOneBy({ id });

  if (!searchProject) {
    throw new AppError("Project Not Found", 404);
  } else {
    const projectUpdate = await projectRepository
      .createQueryBuilder()
      .delete()
      .from(Project)
      .where("id = :id", { id: id })
      .execute();
    return projectUpdate;
  }
};

export default deleteProjectService;
