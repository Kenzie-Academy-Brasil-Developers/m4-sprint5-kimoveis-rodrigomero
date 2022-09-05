import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";

const scheduleListService = async (PropertyId: string) => {
    const propertyRepo = AppDataSource.getRepository(Property);
    const property = await propertyRepo.findOneBy({ id: PropertyId });

    if (!property) {
        throw new AppError(404, "Property not found");
    }

    return property.schedules;
};

export default scheduleListService;
