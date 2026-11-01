
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users. Only administrators can access this endpoint.
 *     tags: [User]
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
 *         description: Number of users per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort users
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       403:
 *         description: Admin access required
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get user information
 *     description: Administrators can retrieve users. Regular users can only retrieve their own information.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *         description: User retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *
 *   patch:
 *     summary: Update user information
 *     description: Users can update their own username and password. Administrators can also change user roles.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: parsa
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: NewPassword123
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: user
 *                 description: Only administrators can change this field.
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You are not authorized to update this user
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid user data
 */

import express from'express';
import isAdmin from '../Middleware/IsAdmin.js';
import { getAll, getOne, update } from '../Controllers/UserCn.js';
import isLogin from '../Middleware/IsLogin.js';
const userRouter = express.Router();
userRouter.route('/').get(isAdmin, getAll);
userRouter.route('/:id').get(isLogin, getOne).patch(isLogin, update);

export default userRouter;
