import exppress from 'express';
const authRouter = exppress.Router();

import { testAuth, signupUser } from '../../controllers/auth/auth';

authRouter.route('/').post(signupUser);
authRouter.route('/test').get(testAuth);

export default authRouter;
