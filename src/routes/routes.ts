import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { postRoutes } from '../modules/post/post.routes';
import { transactionRoutes } from '../modules/transaction/tarnsaction.routes';

export const router = Router();
const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
  {
    path:'/transactions',
    route: transactionRoutes,
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
