
/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and deletion
 */

/**
 * @swagger
 * /api/uploads:
 *   post:
 *     summary: Upload a file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload (maximum size 10 MB)
 *     responses:
 *       200:
 *         description: File uploaded successfully
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
 *                   example: File uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     fieldname:
 *                       type: string
 *                       example: file
 *                     originalname:
 *                       type: string
 *                       example: image.jpg
 *                     mimetype:
 *                       type: string
 *                       example: image/jpeg
 *                     filename:
 *                       type: string
 *                       example: 1730456789-image.jpg
 *                     size:
 *                       type: integer
 *                       example: 102400
 *       400:
 *         description: No file uploaded
 *       403:
 *         description: Admin access required
 *       413:
 *         description: File size exceeds the 10 MB limit
 *
 *   delete:
 *     summary: Delete an uploaded file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filename
 *             properties:
 *               filename:
 *                 type: string
 *                 example: 1730456789-image.jpg
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       400:
 *         description: No filename provided or invalid filename
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Error deleting file
 */

import express from "express";
import upload from "./../Utils/Upload.js";
import { removeFile, uploadData } from "../Controllers/UploadCn.js";
const uploadRouter = express.Router();
uploadRouter
  .route("/")
  .post(upload.single("file"), uploadData)
  .delete(removeFile);

export default uploadRouter;
