import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userCreateService from "../../services/users/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {
    try {
        const { name, password, email, isAdm } = req.body;
        const newUser = await userCreateService({
            name,
            email,
            password,
            isAdm,
        });

        return res.status(201).json(newUser);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default userCreateController;
