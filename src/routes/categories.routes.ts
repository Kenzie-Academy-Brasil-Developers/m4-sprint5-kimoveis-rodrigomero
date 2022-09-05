import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoryListController from "../controllers/categories/categoryList.controller";
import listPropertiesOfCategoryController from "../controllers/categories/listPropertiesOfCategory.controller";
import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();

export const categoriesRoutes = () => {
    routes.post("/", authMiddleware, categoryCreateController);
    routes.get("/", categoryListController);
    routes.get("/:id/properties", listPropertiesOfCategoryController);

    return routes;
};
