import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listPropertiesOfCategoryService from "../../services/categories/listPropertiesOfCategory.service";

const listPropertiesOfCategoryController = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        const serviceResponse = await listPropertiesOfCategoryService(id);
        return res.status(200).json({
            id,
            name: serviceResponse.name,
            properties: serviceResponse.properties
        });
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default listPropertiesOfCategoryController;
