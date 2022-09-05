import { Router } from "express";
import propertyListController from "../controllers/properties/propertyList.controller";
import scheduleCreateController from "../controllers/schedules/scheduleCreate.controller";

import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();

export const schedulesRoutes = () => {
    routes.post("/", scheduleCreateController);
    routes.get("/", authMiddleware, propertyListController);

    return routes;
};
