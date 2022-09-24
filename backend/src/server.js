import express from "express";
import mongoose from "mongoose";
import config from "./config";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.route";
import courseRoutes from "./routes/course.route";
import enrollmentRoutes from "./routes/enrollment.routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Classroom Infinity");
});
app.use(cors({ origin: "*" }));
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", courseRoutes);
app.use("/", enrollmentRoutes);
app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
  next();
});
// Database Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect database ${config.mongoUri}`);
});
