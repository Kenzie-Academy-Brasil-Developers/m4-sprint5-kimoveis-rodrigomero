import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Category } from "../../entities/category.entity";
import { Property } from "../../entities/property.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const propertyCreateService = async ({
    value,
    size,
    address,
    categoryId,
}: IPropertyRequest) => {
    const propRepo = AppDataSource.getRepository(Property);
    const addressRepo = AppDataSource.getRepository(Address);
    const catRepo = AppDataSource.getRepository(Category);

    const category = await catRepo.findOneBy({ id: categoryId });
    if (!category) {
        throw new AppError(409, "Invalid category");
    }
    const addressInUse = await propRepo.findOneBy({ address });
    if (addressInUse) {
        throw new AppError(409, "Address in use");
    }
    if (address.state.length > 2 || address.zipCode.length > 8) {
        throw new AppError(409, "Invalid state or zip code");
    }

    const newAddress = new Address();
    newAddress.district = address.district;
    newAddress.zipCode = address.zipCode;
    newAddress.number = address.number;
    newAddress.city = address.city;
    newAddress.state = address.state;

    addressRepo.create(newAddress);
    await addressRepo.save(newAddress);

    const property = new Property();
    property.value = value;
    property.size = size;
    property.address = newAddress;
    property.sold = false;
    property.category = category;

    propRepo.create(property);
    await propRepo.save(property);

    return property;
};

export default propertyCreateService;
