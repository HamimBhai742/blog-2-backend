import { prisma } from '../config/prisma';
import { ENV } from '../config/env';
import bcryptjs from 'bcryptjs';
import { Role } from '../../generated/prisma/enums';
export const seedAdmin = async () => {
  try {
    const email = ENV.ADMIN_EMAIL;
    const password = ENV.ADMIN_PASS;
    if (!email || !password) return;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) return;
    const hashedPass = await bcryptjs.hash(password, ENV.SALT);

    await prisma.user.create({
      data: {
        email,
        password: hashedPass,
        role: Role.ADMIN,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
