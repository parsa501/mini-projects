
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Blog post management
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - image
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 example: Introduction to JavaScript
 *               description:
 *                 type: string
 *                 minLength: 20
 *                 example: JavaScript is a programming language used to build interactive websites.
 *               image:
 *                 type: string
 *                 example: 1730456789-javascript.jpg
 *               categoryId:
 *                 type: string
 *                 example: 671a2b3c4d5e6f7890123456
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid post data
 *       403:
 *         description: Admin access required
 *
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort posts
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 *
 *   patch:
 *     summary: Update a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 example: Advanced JavaScript
 *               description:
 *                 type: string
 *                 minLength: 20
 *                 example: Learn advanced JavaScript concepts and techniques.
 *               image:
 *                 type: string
 *                 example: 1730456789-advanced-js.jpg
 *               categoryId:
 *                 type: string
 *                 example: 671a2b3c4d5e6f7890123456
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid post data
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Post not found
 *
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Post not found
 */

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
