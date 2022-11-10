import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { ProjectTech } from "../../entities/projectTechs.entity";
import { Tech } from "../../entities/tech.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IProjectRequest } from "../../interfaces/projects";
import { IProjectTechsRequest } from "../../interfaces/ProjectTechs";

const createProjectService = async (data: IProjectRequest, userId: string) => {
  const projectTechsRepository = AppDataSource.getRepository(ProjectTech);
  const projectRepository = AppDataSource.getRepository(Project);
  const techRepository = AppDataSource.getRepository(Tech);
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: userId });
  const arrayTechs: string[] = [];

  if (!data.techsId || data.techsId.length === 0) {
    throw new AppError(
      `techsId is required, if you have not created a technology, proceed with the creation through the POST endpoint: /technologies`
    );
  }

  await Promise.all(
    data.techsId.map(async (element) => {
      const { id } = element;
      if (id) {
        const checkTech = await techRepository.findOneBy({ id: id });
        if (checkTech === null) {
          throw new AppError(`tech: id ${id} not find`, 404);
        }
        arrayTechs.push(checkTech.id);
      }
      const { name } = element;
      if (name) {
        const checkTech = await techRepository.findOneBy({
          name: name,
          userId: userId,
        });
        if (checkTech === null) {
          throw new AppError(`tech: name ${name} not find`, 404);
        }
        arrayTechs.push(checkTech.id);
      }
    })
  );

  if (!data.name) {
    throw new AppError("name is a field required");
  }

  if (!data.category) {
    throw new AppError("category is a field required");
  }

  if (!data.link) {
    throw new AppError("link is a field required");
  }

  if (!userExist) {
    throw new AppError("User not found", 404);
  }

  let project = projectRepository.create(data);
  project.userId = userExist.id;
  project = await projectRepository.save(project);

  await Promise.all(
    arrayTechs.map(async (idTech) => {
      const projectTechs: IProjectTechsRequest = {
        projectsId: project.id,
        techsId: idTech,
      };
      let projectTechCreated = projectTechsRepository.create(projectTechs);
      projectTechCreated = await projectTechsRepository.save(
        projectTechCreated
      );
    })
  );

  const findProject = await projectRepository.findOneBy({ id: project.id });

  return findProject;
};

export default createProjectService;
