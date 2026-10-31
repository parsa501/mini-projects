import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.get("/api/posts", (req, res, next) => {
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const posts = JSON.parse(data).posts;
  return res.status(200).json({
    data: posts,
    success: true,
  });
});
app.get("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const posts = JSON.parse(data).posts;
  const post = posts.find((post) => post.id == id);
  if (post) {
    return res.status(200).json({
      data: post,
      success: true,
    });
  } else {
    return res.status(404).json({
      error: "Post Not Found",
      success: false,
    });
  }
});
app.post("/api/posts", (req, res, next) => {
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);
  const { title = null, author = null, content = null } = req.body;
  if (!title || !author || !content) {
    return res.status(400).json({
      error: "All fields are required",
      success: false,
    });
  }
  const newPost = {
    id: +jsonData.posts.at(-1).id + 1,
    title,
    author,
    content,
    like: 0,
    date: new Date().toISOString(),
  };
  jsonData.posts.push(newPost);
  fs.writeFileSync(`${__dirname}/db/data.json`, JSON.stringify(jsonData));
  return res.status(201).json({
    data: newPost,
    success: true,
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);
  const comments = jsonData.comments;
  const posts = jsonData.posts?.filter((post) => post.id != id);
  fs.writeFileSync(
    `${__dirname}/db/data.json`,
    JSON.stringify({ comments, posts })
  );
  return res.status(201).json({
    message: "Post deleted successfully",
    success: true,
  });
});
app.patch("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);
  const comments = jsonData.comments;
  const posts = jsonData.posts?.map((post) => {
    if (post.id == id) {
      return { ...post, ...req.body };
    } else {
      return post;
    }
  });
  fs.writeFileSync(
    `${__dirname}/db/data.json`,
    JSON.stringify({ comments, posts })
  );
  return res.status(201).json({
    data: posts.find((post) => post.id == id),
    message: "Post updated successfully",
    success: true,
  });
});
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
    success: false,
  });
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
