import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.asyncFn';
import { authServices } from './auth.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes';
import passport from 'passport';
import { AppError } from '../../error/coustom.error';
import { createUserToken } from '../../utils/create.user.token';
import { setCookies } from '../../utils/set.cookies';

const register = createAsyncFn(async (req: Request, res: Response) => {
  const data = req.body;

  const user = await authServices.register(data);
  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

const loging = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(err, httpStatusCode.BAD_REQUEST));
      }
      if (!user) {
        return next(new AppError(info.message, httpStatusCode.BAD_REQUEST));
      }

      const token = createUserToken(user);
      setCookies(res, token);
      delete user.password;
      sendResponse(res, {
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'User logged in successfully',
        data: user,
      });
    })(req, res, next);
  }
);

export const authController = {
  register,
  loging,
};
