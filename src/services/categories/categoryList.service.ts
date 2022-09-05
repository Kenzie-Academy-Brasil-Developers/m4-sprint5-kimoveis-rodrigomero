import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const categoryListService = async () => {
    const catRepo = AppDataSource.getRepository(Category);
    const categories = await catRepo.find();

    return categories;
};

export default categoryListService;
