import { Response } from 'express';
interface IMetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
  metaData?: IMetaData;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  const { statusCode, success, message, data: responseData, metaData } = data;
  res.status(statusCode).json({
    success,
    message,
    data: responseData,
    metaData,
  });
  return res;
};
