import exppress from 'express';
const authRouter = exppress.Router();

import { testAuth, signupUser, loginUser } from '../../controllers/auth/auth';

authRouter.route('/register').post(signupUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/test').get(testAuth);

export default authRouter;
