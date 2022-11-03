import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors";
import { IProjectRequest } from "../../interfaces/projects";

const updateProjectService = async (
  id: string,
  { name, category, image, link, technology, userId }: IProjectRequest
) => {
  const projectRepository = AppDataSource.getRepository(Project);

  const searchProject = await projectRepository.findOneBy({ id });
  if (!searchProject) {
    throw new AppError("Project Not Found", 404);
  } else {
    projectRepository.update(id, {
      name: name ? name : searchProject.name,
      category: category ? category : searchProject.category,
      image: image ? image : searchProject.image,
      link: link ? link : searchProject.link,
      technology: technology ? technology : searchProject.technology,
    });

    const projectUpdated = await projectRepository.findOneBy({ id });

    return projectUpdated!;
  }
};

export default updateProjectService;
