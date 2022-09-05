import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import propertyCreateService from "../../services/properties/propertyCreate.service";

const propertyCreateController = async (req: Request, res: Response) => {
    try {
        if (!req.body.decoded.isAdm) {
            return res.status(403).json({ message: "not authorized" });
        }

        const { value, size, address, categoryId } = req.body;

        const property = await propertyCreateService({
            value,
            size,
            address,
            categoryId,
        });

        return res.status(201).json(property);
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default propertyCreateController;
