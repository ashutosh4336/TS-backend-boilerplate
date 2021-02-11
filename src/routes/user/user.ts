import exppress from 'express';
const userRouter = exppress.Router();

import { updateUser } from '../../controllers/user/user';

userRouter.route('/').post(updateUser);

export default userRouter;
