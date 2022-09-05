import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import loginService from "../services/login.service";

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const token = await loginService({ email, password });

        return res.status(200).json(token);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default loginController;
