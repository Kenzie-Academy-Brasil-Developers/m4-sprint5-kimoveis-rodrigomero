import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import categoryCreateService from "../../services/categories/categoryCreate.service";

const categoryCreateController = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!req.body.decoded.isAdm) {
            return res.status(403).json({ message: "not authorized" });
        }
        const category = await categoryCreateService({ name });

        return res.status(201).json(category);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default categoryCreateController;
