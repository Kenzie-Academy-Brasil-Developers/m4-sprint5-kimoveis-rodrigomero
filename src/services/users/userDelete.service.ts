import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const userDeleteService = async (id: string) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id });
    
    if (!user) {
        throw new AppError(404, "User not found");
    }
    if (!user.isActive) {
        throw new AppError(400, "User already inactive");
    }
    user.isActive = false;
    await userRepo.save(user)
};

export default userDeleteService;
