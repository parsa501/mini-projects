import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Posts & Comments API",
      version: "1.0.0",
      description: "API documentation for Posts and Comments",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Server",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts management
 *   - name: Comments
 *     description: Comments management
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 */
app.get("/api/posts", (req, res, next) => {
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const posts = JSON.parse(data).posts;

  return res.status(200).json({
    data: posts,
    success: true,
  });
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 */
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

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               author:
 *                 type: string
 *                 example: Parsa
 *               content:
 *                 type: string
 *                 example: This is my first post
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: All fields are required
 */
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

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Post deleted successfully
 */
app.delete("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);
  const comments = jsonData.comments;
  const posts = jsonData.posts?.filter((post) => post.id != id);

  fs.writeFileSync(
    `${__dirname}/db/data.json`,
    JSON.stringify({ comments, posts }),
  );

  return res.status(201).json({
    message: "Post deleted successfully",
    success: true,
  });
});

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post updated successfully
 */
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
    JSON.stringify({ comments, posts }),
  );

  return res.status(201).json({
    data: posts.find((post) => post.id == id),
    message: "Post updated successfully",
    success: true,
  });
});

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Get all comments of a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       404:
 *         description: Post not found
 */
app.get("/api/posts/:postId/comments", (req, res, next) => {
  const { postId } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);

  const post = jsonData.posts.find((post) => post.id == postId);

  if (!post) {
    return res.status(404).json({
      error: "Post Not Found",
      success: false,
    });
  }

  const comments = jsonData.comments.filter(
    (comment) => comment.postId == postId,
  );

  return res.status(200).json({
    data: comments,
    success: true,
  });
});

/**
 * @swagger
 * /api/posts/{postId}/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *       404:
 *         description: Comment not found
 */
app.get("/api/posts/:postId/comments/:id", (req, res, next) => {
  const { postId, id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);

  const comment = jsonData.comments.find(
    (comment) => comment.postId == postId && comment.id == id,
  );

  if (!comment) {
    return res.status(404).json({
      error: "Comment Not Found",
      success: false,
    });
  }

  return res.status(200).json({
    data: comment,
    success: true,
  });
});

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *             properties:
 *               content:
 *                 type: string
 *                 example: Great post!
 *               author:
 *                 type: string
 *                 example: Parsa
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: All fields are required
 *       404:
 *         description: Post not found
 */
app.post("/api/posts/:postId/comments", (req, res, next) => {
  const { postId } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);

  const post = jsonData.posts.find((post) => post.id == postId);

  if (!post) {
    return res.status(404).json({
      error: "Post Not Found",
      success: false,
    });
  }

  const { content = null, author = null } = req.body;

  if (!content || !author) {
    return res.status(400).json({
      error: "All fields are required",
      success: false,
    });
  }

  const newComment = {
    id: Math.max(0, ...jsonData.comments.map((comment) => comment.id)) + 1,
    postId: Number(postId),
    content,
    author,
    date: new Date().toISOString(),
    likes: 0,
  };

  jsonData.comments.push(newComment);

  fs.writeFileSync(`${__dirname}/db/data.json`, JSON.stringify(jsonData));

  return res.status(201).json({
    data: newComment,
    success: true,
  });
});

/**
 * @swagger
 * /api/posts/{postId}/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
app.delete("/api/posts/:postId/comments/:id", (req, res, next) => {
  const { postId, id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);

  const commentExists = jsonData.comments.some(
    (comment) => comment.postId == postId && comment.id == id,
  );

  if (!commentExists) {
    return res.status(404).json({
      error: "Comment Not Found",
      success: false,
    });
  }

  jsonData.comments = jsonData.comments.filter(
    (comment) => !(comment.postId == postId && comment.id == id),
  );

  fs.writeFileSync(`${__dirname}/db/data.json`, JSON.stringify(jsonData));

  return res.status(200).json({
    message: "Comment deleted successfully",
    success: true,
  });
});

/**
 * @swagger
 * /api/posts/{postId}/comments/{id}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
app.patch("/api/posts/:postId/comments/:id", (req, res, next) => {
  const { postId, id } = req.params;
  const data = fs.readFileSync(`${__dirname}/db/data.json`);
  const jsonData = JSON.parse(data);

  const commentExists = jsonData.comments.some(
    (comment) => comment.postId == postId && comment.id == id,
  );

  if (!commentExists) {
    return res.status(404).json({
      error: "Comment Not Found",
      success: false,
    });
  }

  const { content, author } = req.body;

  jsonData.comments = jsonData.comments.map((comment) => {
    if (comment.postId == postId && comment.id == id) {
      return {
        ...comment,
        ...(content !== undefined && { content }),
        ...(author !== undefined && { author }),
      };
    }

    return comment;
  });

  fs.writeFileSync(`${__dirname}/db/data.json`, JSON.stringify(jsonData));

  return res.status(200).json({
    data: jsonData.comments.find(
      (comment) => comment.postId == postId && comment.id == id,
    ),
    message: "Comment updated successfully",
    success: true,
  });
});

// 404 Handler
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
    success: false,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
