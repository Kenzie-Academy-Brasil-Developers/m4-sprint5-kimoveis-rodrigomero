import { Router } from "express";
import propertyCreateController from "../controllers/properties/propertyCreate.controller";
import propertyListController from "../controllers/properties/propertyList.controller";

import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();

export const propertiesRoutes = () => {
    routes.post("/", authMiddleware, propertyCreateController);
    routes.get("/", propertyListController);

    return routes;
};
