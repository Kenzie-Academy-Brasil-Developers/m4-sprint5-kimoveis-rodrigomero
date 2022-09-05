import { Router } from "express";
import listUsersController from "../controllers/users/listUsers.controller";
import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteController from "../controllers/users/userDelete.controller";
import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();

export const userRoutes = () => {
    routes.post("/", userCreateController);
    routes.get("/", authMiddleware, listUsersController);
    routes.delete("/:id", authMiddleware, userDeleteController);

    return routes;
};
