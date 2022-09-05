import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import propertyListService from "../../services/properties/propertyList.service";

const propertyListController = async (req: Request, res: Response) => {
    try {
        const properties = await propertyListService();

        return res.status(200).json(properties);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default propertyListController;
