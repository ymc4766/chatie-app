import express from "express";
// import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import { db } from "./config/db.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught expection");
  process.exit(1);
});

import "dotenv/config";

import cors from "cors";
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

import messageRoutes from "./routes/messageRoutes.js";

import cookieParser from "cookie-parser";
import { errorHandler, handleNotFound } from "./middleware/errorHandler.js";
import logger from "./config/logger.js";
import SocketServer from "./SocketServer.js";

const app = express();
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});
const port = process.env.PORT || 5000;

// dotenv.config();
db();

// app.use(morgan());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cors());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use("/api/category", categoryRoutes);
app.use("/api", conversationRoutes);
app.use("/api", messageRoutes);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// app.use(express.static(path.join(__dirname, "/frontend/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/*", handleNotFound);
// app.use(serverError);
app.use(errorHandler);

let server;

server = app.listen(port, console.log(`app is running on ${port} port`));

// socket io

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});

io.on("connection", (socket) => {
  logger.info("socket io connected succesfuly ...");
  SocketServer(socket, io);
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
