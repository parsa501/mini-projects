import express from "express";
import {
  addOrRemoveMember,
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/ChatCn.js";
const chatRouter = express.Router();
chatRouter.route("/").get(getAll).post(create);
chatRouter.route("/change-member/:id").post(addOrRemoveMember);
chatRouter.route("/:id").get(getOne).patch(update).delete(remove);
export default chatRouter;
