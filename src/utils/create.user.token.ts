import { ENV } from '../config/env';
import jwt, { SignOptions } from 'jsonwebtoken';

export const createUserToken = (user: any) => {
  const payload = {
    userId: user.id,
    role: user.role,
    email: user.email,
  };
  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  } as SignOptions);
  return {
    accessToken: token,
  };
};
