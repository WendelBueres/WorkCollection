import AppDataSource from "../../data-source";
import { Project } from "../../entities/project.entity";
import { ProjectTech } from "../../entities/projectTechs.entity";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors";
import { IProjectTechsRequest } from "../../interfaces/ProjectTechs";
import { ITechRegisterRegister, ITechs } from "../../interfaces/techs";

const updateProjectService = async (id: string, userId: string, data: any) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const techRepository = AppDataSource.getRepository(Tech);
  const projectTechsRepository = AppDataSource.getRepository(ProjectTech);

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

  if (data.techsId) {
    const arrayTechs: string[] = [];

    if (data.techsId.length === 0) {
      throw new AppError(
        `techsId is required, if you have not created a technology, proceed with the creation through the POST endpoint: /technologies`
      );
    }

    await Promise.all(
      data.techsId.map(async (element: ITechRegisterRegister) => {
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

    await Promise.all(
      projectExist.techs.map(async (element) => {
        console.log("Element!!!!AQUI!!!!", element);
        await projectTechsRepository.delete(element.id);
      })
    );

    await Promise.all(
      arrayTechs.map(async (idTech) => {
        const projectTechs: IProjectTechsRequest = {
          projectsId: id,
          techsId: idTech,
        };
        let projectTechCreated = projectTechsRepository.create(projectTechs);
        projectTechCreated = await projectTechsRepository.save(
          projectTechCreated
        );
      })
    );

    delete data.techsId;
  }

  if (data.name || data.category || data.image || data.link) {
    await projectRepository.update(id, data);
  }

  const projectUpdated = await projectRepository.findOneBy({ id: id });

  return projectUpdated;
};

export default updateProjectService;
