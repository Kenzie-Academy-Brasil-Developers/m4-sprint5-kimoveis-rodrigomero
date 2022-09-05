import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import scheduleCreateService from "../../services/schedules/scheduleCreate.service";

const scheduleCreateController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body.decoded.userId;
        const { date, hour, propertyId } = req.body;
        const schedule = await scheduleCreateService({
            date,
            hour,
            propertyId,
            userId,
        });

        return res.status(201).json(schedule)
    } catch (err) {
        if (err instanceof AppError) {
            handleError(err, res);
        }
    }
};

export default scheduleCreateController;
