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
