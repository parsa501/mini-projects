import express from'express';
import isAdmin from '../Middleware/IsAdmin.js';
import isLogin from '../Middleware/IsLogin.js';
import { changeIsPublish, create, getAll, getAllPostComments, remove } from '../Controllers/CommentCn.js';
const commentRouter=express.Router();
commentRouter.route('/').get(isAdmin,getAll).post(isLogin,create);
commentRouter.route('/:id').get(getAllPostComments).patch(isAdmin,changeIsPublish).delete(isAdmin,remove);
export default commentRouter