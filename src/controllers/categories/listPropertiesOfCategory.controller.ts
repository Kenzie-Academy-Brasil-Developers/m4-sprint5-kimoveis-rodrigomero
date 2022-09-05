import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listPropertiesOfCategoryService from "../../services/categories/listPropertiesOfCategory.service";

const listPropertiesOfCategoryController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const properties = await listPropertiesOfCategoryService(id);
        return res.status(200).json(properties);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default listPropertiesOfCategoryController;
