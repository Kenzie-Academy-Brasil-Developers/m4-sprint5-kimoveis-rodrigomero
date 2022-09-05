import { Router } from "express";
import scheduleCreateController from "../controllers/schedules/scheduleCreate.controller";
import scheduleListController from "../controllers/schedules/scheduleList.controller";

import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();

export const schedulesRoutes = () => {
    routes.post("/", authMiddleware, scheduleCreateController);
    routes.get("/properties/:id", authMiddleware, scheduleListController);

    return routes;
};
