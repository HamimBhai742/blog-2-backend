import { NextFunction, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import { Prisma } from '../../generated/prisma/client';

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  const errSource: any = [];

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatusCode.BAD_REQUEST;
    const lines = err.message.split('\n');
    message = lines[lines.length - 1].trim();
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = httpStatusCode.CONFLICT;
      message = 'Duplicate field value';

      errSource.push(err.meta);
    }
  }

    if (err.name === 'ZodError') {
    statusCode = httpStatusCode.BAD_REQUEST;
    message = 'Zod Validation Error';
    err.issues.forEach((i: any) => {
      errSource.push({
        path: i.path[i.path.length - 1],
        message: i.message,
      });
    });
  } 


 

  res.status(statusCode).json({
    success: false,
    message,
    errSource,
  });
};
