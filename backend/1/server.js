import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/api/post", (req, res) => {
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const posts = JSON.parse(data);
  return res.status(200).json({
    message: "Hello from the backend!",
    data: posts,
    success: true,
  });
});
app.get("/api/post/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const posts = JSON.parse(data).posts;
  const post = posts.find((post) => post.id == id);
  if (post) {
    return res.status(200).json({
      message: "Hello from the backend!",
      data: post,
      success: true,
    });
  } else {
    return res.status(404).json({
      error: "post ont found ",
      success: false,
    });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    message: "Route not found",
    success: false,
  });
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
