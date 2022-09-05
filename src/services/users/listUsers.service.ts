import e from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUsersService = async () => {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();
    users.forEach((element) => {
        delete element.password;
    });

    return users;
};

export default listUsersService;
