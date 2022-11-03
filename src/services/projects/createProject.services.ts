import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { User } from "../../entities/user.entity";
import { IProject } from "../../interfaces/projects";

const createProjectService = async ({
  id,
  name,
  category,
  image,
  link,
  technology,
  userId,
}: IProject): Promise<Project> => {
  const projectRepository = AppDataSource.getRepository(Project);
  const userRepository = AppDataSource.getRepository(User);

  const projectId = await userRepository.findOneBy({ id: userId });

  const project = projectRepository.create({
    name: name,
    category: category,
    image: image,
    link: link,
    technology: technology,
  });

  await projectRepository.save(project);
  return project;
};

export default createProjectService;
