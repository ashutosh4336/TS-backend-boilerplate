import exppress from 'express';
const adminRouter = exppress.Router();

import { testAdmin } from '../../controllers/admin/admin';

adminRouter.route('/').get(testAdmin);

export default adminRouter;
