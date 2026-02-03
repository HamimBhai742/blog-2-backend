export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  DB_URL: process.env.DB_URL as string,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASS: process.env.ADMIN_PASS as string,
  SALT: Number(process.env.SALT) || 10,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
};
