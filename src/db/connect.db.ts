import { prisma } from '../config/prisma';

export const connectDB = async () => {
  try {
    await prisma
      .$connect()
      .then(() => {
        console.log('Connected to database');
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
