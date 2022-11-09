import AppDataSource from "../../data-source";
import { Tech } from "../../entities/tech.entity";
import { AppError } from "../../errors";

const deleteTechService = async (id: string) => {
  const TechRepository = AppDataSource.getRepository(Tech);

  const searchTech = await TechRepository.findOneBy({ id });

  if (!searchTech) {
    throw new AppError("Tech Not Found", 404);
  } else {
    const TechUpdate = await TechRepository
      .createQueryBuilder()
      .delete()
      .from(Tech)
      .where("id = :id", { id: id })
      .execute();
    return TechUpdate;
  }
};

export default deleteTechService;
