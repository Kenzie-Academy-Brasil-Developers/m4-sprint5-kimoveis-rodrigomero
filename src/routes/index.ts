import { Express } from "express";
import loginController from "../controllers/login.controller";
import { categoriesRoutes } from "./categories.routes";
import { propertiesRoutes } from "./properties.routes";
import { schedulesRoutes } from "./schedules.routes";
import { userRoutes } from "./users.routes";

export const appRoutes = (app: Express) => {
    app.use("/users", userRoutes());
    app.post("/login", loginController);
    app.use("/categories", categoriesRoutes());
    app.use("/properties", propertiesRoutes());
    app.use("/schedules", schedulesRoutes());
};
