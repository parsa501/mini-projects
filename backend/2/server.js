import mongoose from "mongoose";
import app from "./app.js";
import { __dirname } from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/config.env` });
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connected failed", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
