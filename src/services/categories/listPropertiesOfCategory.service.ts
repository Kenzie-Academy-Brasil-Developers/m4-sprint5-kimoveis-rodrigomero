import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";

const listPropertiesOfCategoryService = async (id: string) => {
    const propertiesRepo = AppDataSource.getRepository(Property);
    const properties = await propertiesRepo.find({
        where: { category: { id } },
    });
    const categoryRepo = AppDataSource.getRepository(Category);
    const category = await categoryRepo.findOneBy({ id });
    if (!properties) {
        throw new AppError(404, "properties not  found");
    }
    if(!category){
        throw new AppError(404, "category not  found");
    }

    return { name: category?.name, properties };
};

export default listPropertiesOfCategoryService;
