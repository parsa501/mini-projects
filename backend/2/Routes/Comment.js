
/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment management
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
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
 *         description: Number of comments per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort comments
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       403:
 *         description: Admin access required
 *
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - content
 *             properties:
 *               postId:
 *                 type: string
 *                 example: 671a2b3c4d5e6f7890123456
 *               content:
 *                 type: string
 *                 minLength: 5
 *                 example: This is a great post!
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid comment data
 *       401:
 *         description: Authentication required
 *
 * /api/comments/{id}:
 *   get:
 *     summary: Get comments of a specific post
 *     description: Admins can see all comments of the post. Other users can only see published comments.
 *     tags: [Comment]
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
 *         description: Number of comments per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort comments
 *     responses:
 *       200:
 *         description: Post comments retrieved successfully
 *
 *   patch:
 *     summary: Toggle comment publication status
 *     description: Publish an unpublished comment or unpublish a published comment.
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment publication status changed successfully
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Comment not found
 *
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Comment not found
 */

import express from'express';
import isAdmin from '../Middleware/IsAdmin.js';
import isLogin from '../Middleware/IsLogin.js';
import { changeIsPublish, create, getAll, getAllPostComments, remove } from '../Controllers/CommentCn.js';
const commentRouter=express.Router();
commentRouter.route('/').get(isAdmin,getAll).post(isLogin,create);
commentRouter.route('/:id').get(getAllPostComments).patch(isAdmin,changeIsPublish).delete(isAdmin,remove);
export default commentRouter
