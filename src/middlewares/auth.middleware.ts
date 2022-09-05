import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[0];
    if (!token) {
        return res.status(401).json("Missing Authorization token");
    }
    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (error: any, decoded: any) => {
            if (error) {
                return res.status(401).json({
                    message: "invalid token",
                });
            }

            req.body.decoded = {
                isAdm: decoded.isAdm,
                email: decoded.email,
                userId: decoded.id
            };

            next();
        }
    );
};

export default authMiddleware;
