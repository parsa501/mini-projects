import express from 'express'
import { changePublish, create, getAll, getAllPostComments, remove } from '../Controllers/CommentCn.js';
import isLogin from '../Middlewares/IsLogin.js';
import isAdmin from '../Middlewares/IsAdmin.js';
const commentRouter = express.Router();
commentRouter.route('/').post(isLogin,create).get(getAll);
commentRouter.route('/:id').delete(isAdmin,remove).patch(isAdmin,changePublish).get(getAllPostComments);
export default commentRouter;