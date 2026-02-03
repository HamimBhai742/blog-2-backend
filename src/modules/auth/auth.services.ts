import bcryptjs from 'bcryptjs';
import { ENV } from '../../config/env';
import { prisma } from '../../config/prisma';
const register = async (payload: any) => {
  const hashedPass = await bcryptjs.hash(payload.password, ENV.SALT);
  payload.password = hashedPass;

  const user = await prisma.user.create({ data: payload });
  return user;
};

export const authServices = {
  register,
};
