import { server } from "./Socket/index.js";
import dotenv from "dotenv";
import { __dirname } from "./app.js";
import mongoose from "mongoose";
dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
