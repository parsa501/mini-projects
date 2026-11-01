import express from'express';
import isAdmin from '../Middleware/IsAdmin.js';
import { getAll, getOne, update } from '../Controllers/UserCn.js';
import isLogin from '../Middleware/IsLogin.js';
const userRouter = express.Router();
userRouter.route('/').get(isAdmin, getAll);
userRouter.route('/:id').get(isLogin, getOne).patch(isLogin, update);

export default userRouter;