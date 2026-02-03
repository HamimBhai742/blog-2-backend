import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.asyncFn';
import { userServices } from './user.services';
import { sendResponse } from '../../utils/send.response';
import httpStatusCode from 'http-status-codes'
;
const getAllUsers = createAsyncFn(async (req: Request, res: Response) => {
  const users = await userServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

export const userController = {
  getAllUsers,
};
