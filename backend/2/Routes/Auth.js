/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user registration
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and return a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: parsa
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 671a2b3c4d5e6f7890123456
 *                         username:
 *                           type: string
 *                           example: parsa
 *                         role:
 *                           type: string
 *                           enum: [user, admin]
 *                           example: user
 *       400:
 *         description: Username and password are required
 *       401:
 *         description: Invalid username or password
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     description: Create a new user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: parsa
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Password123
 *                 description: Must contain at least one uppercase letter, one lowercase letter, and one number.
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing username/password or password does not meet requirements
 *       500:
 *         description: Internal server error
 */

import express from "express";
import { login, register } from "../Controllers/AuthCn.js";
const authRouter = express.Router();
authRouter.route("/").post(login);
authRouter.route("/register").post(register);
export default authRouter;
