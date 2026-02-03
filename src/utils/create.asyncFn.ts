import { NextFunction, Request, Response } from 'express';

type asyncFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const createAsyncFn =
  (fn: asyncFn) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => next(error));
  };
