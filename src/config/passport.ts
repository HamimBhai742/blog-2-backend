import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from './prisma';
import bcryptjs from 'bcryptjs';

//use local strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return done(null, false, {
            message: 'Invalid email. Please enter a registered email address',
          });
        }
        const matchPass = await bcryptjs.compare(password, user.password);
        if (!matchPass) {
          return done(null, false, {
            message: 'Invalid password',
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(
  (user: Express.User, done: (err: any, id?: unknown) => void) => {
    done(null, user);
  }
);

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});