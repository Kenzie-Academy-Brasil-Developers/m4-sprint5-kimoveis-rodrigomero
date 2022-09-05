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
        throw new AppError(404, "Invalid user or property");
    }

    const schedulesCreated = await scheduleRepo.find({where: {property}})

    const sameDate = schedulesCreated.find(
        (schedule) => schedule.date === date
    );

    
    const sameHour = schedulesCreated.find(
        (schedule) => schedule.hour === hour
    );
    
    console.log(sameDate)
    console.log(sameHour)
    if (sameHour && sameDate) {
        throw new AppError(400, "Time already reserved");
    }

    
    const schedule = new Schedule();
    schedule.date = date;
    schedule.hour = hour;
    schedule.user = user;
    schedule.property = property;

    scheduleRepo.create(schedule);
    await scheduleRepo.save(schedule);
    return schedule;
};

export default scheduleCreateService;
