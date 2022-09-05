import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";

const propertyListService = () => {
    const propRepo = AppDataSource.getRepository(Property);
    const properties = propRepo.find();

    return properties;
};

export default propertyListService;
