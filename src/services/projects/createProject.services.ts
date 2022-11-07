import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IProject, IProjectRequest } from "../../interfaces/projects";

const createProjectService = async (data: IProjectRequest, userId: string) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: userId });

  if (!data.name) {
    throw new AppError("name is a field required");
  }

  if (!data.category) {
    throw new AppError("category is a field required");
  }

  if (!data.link) {
    throw new AppError("link is a field required");
  }

  if (!data.technology) {
    throw new AppError(
      `technology is required, if you have not created a technology, proceed with the creation through the POST endpoint: /technologies`
    );
  }

  if (!userExist) {
    throw new AppError("User not found", 404);
  }

  let project = projectRepository.create(data);
  project.userId = userExist.id;

  project = await projectRepository.save(project);
  return project;
};

export default createProjectService;
