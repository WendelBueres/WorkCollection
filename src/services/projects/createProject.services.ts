import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { IProjectRequest } from "../../interfaces/projects";

const createProjectService = async (data: IProjectRequest, id: any) => {
  const { name, category, image, link, technology } = data;

  const projectRepository = AppDataSource.getRepository(Project);

  const createdProject = projectRepository.create({
    name: name,
    category: category,
    image: image,
    link: link,
    technology: technology,
    user: id,
  });

  await projectRepository.save(createdProject);

  return createdProject;
};

export default createProjectService;
