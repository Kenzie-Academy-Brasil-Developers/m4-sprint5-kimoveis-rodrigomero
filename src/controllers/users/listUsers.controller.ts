import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listUsersService from "../../services/users/listUsers.service";

const listUsersController = async (req: Request, res: Response) => {
    try {
        const isAdm = req.body.decoded;
        if (!isAdm) {
            return res
                .status(401)
                .json({ message: "User is not Admnistrator" });
        }
        const users = await listUsersService();

        return res.status(200).json(users);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default listUsersController;
