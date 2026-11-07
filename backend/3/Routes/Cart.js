import { Router } from "express";
import { addItem, clear, getOne, removeItem } from "../Controllers/CartCn.js";
const cartRouter = Router();
cartRouter.route('/').get(getOne).post(addItem).delete(removeItem);
cartRouter.route('/clear').delete(clear)
export default cartRouter;