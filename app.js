import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected");
  });
  console.log(`Listening at port ${process.env.PORT}`);
});
