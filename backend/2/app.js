import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import commentRouter from "./Routes/Comment.js";
import postRouter from "./Routes/Post.js";
import uploadRouter from "./Routes/Upload.js";
import userRouter from "./Routes/User.js";
import isAdmin from "./Middleware/IsAdmin.js";
import categoryRouter from "./Routes/Category.js";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("Public"));
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/posts", postRouter);
app.use("/api/uploads", isAdmin, uploadRouter);
app.use("/api/users", userRouter);
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
    success: false,
  });
});
export default app;
