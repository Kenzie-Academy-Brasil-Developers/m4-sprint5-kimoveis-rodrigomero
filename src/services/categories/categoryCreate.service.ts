import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const categoryCreateService = async ({ name }: ICategoryRequest) => {
    const catRepo = AppDataSource.getRepository(Category);
    const nameAlreadyInUse = await catRepo.findOneBy({ name });
    if (nameAlreadyInUse) {
        throw new AppError(409, "Name already in use");
    }
    const category = new Category();
    category.name = name;

    catRepo.create(category);
    await catRepo.save(category);

    return category;
};

export default categoryCreateService;
