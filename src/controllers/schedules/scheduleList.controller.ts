import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import scheduleListService from "../../services/schedules/scheduleList.service";

const scheduleListController = async (req: Request, res: Response) => {
    try {
        if (!req.body.decoded.isAdm) {
            return res.status(401).json({ message: "not authorized" });
        }
        const { id: propertyId } = req.params;
        const schedules = await scheduleListService(propertyId);

        return schedules;
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default scheduleListController;
