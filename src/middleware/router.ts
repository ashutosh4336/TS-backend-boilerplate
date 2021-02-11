import { Application } from 'express';
import adminRouter from '../routes/admin/adminRouter';
import authRouter from '../routes/auth/authRouter';
import userRouter from '../routes/user/user';

const routeLoader = (app: Application) => {
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
};

export default routeLoader;
