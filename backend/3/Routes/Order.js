import { Router } from "express";
import { callBackPayment, getAll, getOne, payment, update } from "../Controllers/OrderCn.js";
import isLogin from "../Middlewares/IsLogin.js";
import isAdmin from "../Middlewares/IsAdmin.js";

const orderRouter = Router();
orderRouter.route('/').get(isLogin,getAll)
orderRouter.route('/payment').post(isLogin,payment)
orderRouter.route('/callback-payment').get(isAdmin,callBackPayment)
orderRouter.route('/zarinpal/callback').get(callBackPayment)
orderRouter.route('/:id').get(isLogin,getOne).patch(isAdmin,update)

export default orderRouter;