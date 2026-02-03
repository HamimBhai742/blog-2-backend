import { prisma } from '../../config/prisma';

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const userServices = {
  getAllUsers,
};
