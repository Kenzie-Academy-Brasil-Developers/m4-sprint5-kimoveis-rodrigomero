import AppDataSource from "../../data-source";
import { Property } from "../../entities/property.entity";
import { Schedule } from "../../entities/schedules.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const scheduleCreateService = async ({
    date,
    hour,
    propertyId,
    userId,
}: IScheduleRequest) => {
    const scheduleRepo = AppDataSource.getRepository(Schedule);
    const propRepo = AppDataSource.getRepository(Property);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ id: userId });
    const property = await propRepo.findOneBy({ id: propertyId });

    if (!user || !property) {
        throw new AppError(409, "Invalid user or property");
    }

    const sameHour = property.schedules.find(
        (schedule) => schedule.date === schedule.date && schedule.hour === hour
    );
    if (sameHour) {
        throw new AppError(409, "Time already reserved");
    }

    const schedule = new Schedule();
    schedule.date = date;
    schedule.hour = hour;
    schedule.user = user;
    schedule.property = property;
};

export default scheduleCreateService;
