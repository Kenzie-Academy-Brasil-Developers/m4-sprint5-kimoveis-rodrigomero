import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";

const listPropertiesOfCategoryService = async (id: string) => {
    const catRepo = AppDataSource.getRepository(Category);
    const category = await catRepo.findOneBy({ id });
    if (!category) {
        throw new AppError(404, "Category not  found");
    }
    return category?.properties;
};

export default listPropertiesOfCategoryService;
