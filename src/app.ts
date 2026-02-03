import express, { Request, Response } from 'express';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import { router } from './routes/routes';
import { notFound } from './middleware/not.found';
import { globalError } from './middleware/global.error';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/passport';
import { ENV } from './config/env';
export const app = express();

app.use(
  session({
    secret: ENV.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Blog Back-End Server is running!');
});

app.use(notFound);
app.use(globalError);
