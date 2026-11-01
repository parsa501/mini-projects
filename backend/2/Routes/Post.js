import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/PostCn.js";
import isAdmin from "../Middleware/IsAdmin.js";
const postRouter = express.Router();
postRouter.route("/").post(isAdmin, create).get(getAll);
postRouter
  .route("/:id")
  .get(getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);

export default postRouter;
