import { Application } from 'express';
import adminRouter from '../routes/admin/adminRouter';
import authRouter from '../routes/auth/authRouter';

const routeLoader = (app: Application) => {
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/auth', authRouter);
};

export default routeLoader;
