import { Role } from '../../../generated/prisma/enums';
import { prisma } from '../../config/prisma';

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where:{role:Role.USER}
  });
  return users;
};





export const userServices = {
  getAllUsers,
};
