import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});

app.use("/api/v1/post", postRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server listening on PORT:${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();
