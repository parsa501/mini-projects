
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: JavaScript
 *               icon:
 *                 type: string
 *                 example: javascript-icon
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid category data
 *       403:
 *         description: Admin access required
 *
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
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
 *         description: Number of categories per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort categories
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 *
 *   patch:
 *     summary: Update a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: React
 *               icon:
 *                 type: string
 *                 example: react-icon
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Category not found
 *
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Posts found for this category or category not found
 *       500:
 *         description: Internal server error
 */

import express from'express';
import { create, getAll, getOne, remove, update } from '../Controllers/CategoryCn.js';
import isAdmin from '../Middleware/IsAdmin.js';
const categoryRouter=express.Router();
categoryRouter.route('/').post(isAdmin, create).get(getAll)
categoryRouter.route('/:id').get(getOne).patch(isAdmin, update).delete(isAdmin, remove)

export default categoryRouter
