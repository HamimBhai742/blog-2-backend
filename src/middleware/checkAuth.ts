import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/coustom.error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";
import { prisma } from "../config/prisma";
import httpStatusCode from "http-status-codes";

export const checkAuth = (...roles: string[]) =>async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization|| req.cookies.token;
    if (!token) {
       throw new AppError("No token provided", httpStatusCode.UNAUTHORIZED);
    }
    
    const decode = jwt.verify(token,ENV.JWT_SECRET) as JwtPayload

    const user= await prisma.user.findUnique({
        where:{email:decode.email}
    })
    if(!user){
        throw new AppError("User not found",httpStatusCode.NOT_FOUND);
    }

    if(!roles.includes(user.role)){
        throw new AppError("You are not authorized to access this route",httpStatusCode.FORBIDDEN);
    }
    req.user=decode;
    next()
    } catch (error) {
        next(error);
    }

}