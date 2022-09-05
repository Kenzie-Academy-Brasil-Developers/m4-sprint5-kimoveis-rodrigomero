import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { IUserLogin } from "../interfaces/users";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async ({ email, password }: IUserLogin) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
        throw new AppError(403, "invalid email or password");
    }
    if (!user.isActive) {
        throw new AppError(401, "User inactive");
    }
    let passwordMatch = false;
    if (user.password) {
        passwordMatch = await compare(password, user.password);
    }

    if (!passwordMatch) {
        throw new AppError(403, "invalid email or password");
    }
    
    const token = jwt.sign(
        {
            isAdm: user.isAdm,
            email: user.email,
            id: user.id,
        },
        process.env.SECRET_KEY as string,
        {
            expiresIn: "24h",
        }
    );

    return token;
};

export default loginService;
