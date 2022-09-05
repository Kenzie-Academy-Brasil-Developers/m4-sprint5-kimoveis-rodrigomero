import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({message:"Missing Authorization token"});
    }
    token = token.split(" ")[1];
    
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
