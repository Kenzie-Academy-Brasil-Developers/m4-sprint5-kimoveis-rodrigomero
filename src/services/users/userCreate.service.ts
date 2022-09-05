import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";

const userCreateService = async ({
    name,
    email,
    password,
    isAdm,
}: IUserRequest) => {
    const userRepo = AppDataSource.getRepository(User);
    const emailAlreadyExists = await userRepo.findOne({ where: { email } });

    if (!password) {
        throw new AppError(409, "password is a required field");
    }

    if (emailAlreadyExists) {
        throw new AppError(400, "Email already registered");
    }

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = await hash(password, 10);
    newUser.isAdm = isAdm;
    newUser.isActive = true;

    userRepo.create(newUser);
    await userRepo.save(newUser);

    delete newUser.password;

    return newUser;
};

export default userCreateService;
