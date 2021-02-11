import exppress from 'express';
const authRouter = exppress.Router();

import { testAuth } from '../../controllers/auth/auth';

authRouter.route('/test').get(testAuth);

export default authRouter;
