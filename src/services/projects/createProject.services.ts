import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IProject, IProjectRequest } from "../../interfaces/projects";

const createProjectService = async (data: IProjectRequest) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: data.userId });

  if (!data.name) {
    throw new AppError("name is a field required");
  }

  if (!data.category) {
    throw new AppError("category is a field required");
  }

  if (!data.userId) {
    throw new AppError("userId is a field required");
  }

  if (!data.link) {
    throw new AppError("link is a field required");
  }

  if (!userExist) {
    throw new AppError("User not found", 404);
  }

  let project = projectRepository.create(data);

  project = await projectRepository.save(project);
  return project;
};

export default createProjectService;
