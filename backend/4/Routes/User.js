import express from "express";
import { getOne, update, remove } from "../Controllers/UserCn.js";
const userRouter = express.Router();
userRouter.route("/").get(getOne).patch(update).delete(remove);
export default userRouter;
