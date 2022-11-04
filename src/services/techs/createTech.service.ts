import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";
import { ITechs, ITechsRequest } from "../../interfaces/techs";

const createTechService = async(data: ITechsRequest, id: any): Promise<Tech> => {
    
    const techsRepository = AppDataSource.getRepository(Tech)

    const createdTech = techsRepository.create({
        name: data.name,
        user: id
    })

    await techsRepository.save(createdTech)

    return createdTech
}

export default createTechService;