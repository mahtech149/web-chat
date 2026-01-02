//using CommonJS module system before 2024
// const express = require('express');
// using ES6 module system
import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
const __dirname = path.resolve();

dotenv.config();

//importing routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
//creating express app
// const app = express();
// increase JSON body size to accept base64 images from client
app.use(express.json({ limit: "10mb" }));

// use cookieParser to read the cookie in the req
app.use(cookieParser());

// cors config
const corsOptions = {
  origin: "http://localhost:5174", // Array of allowed origins
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed methods
  // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow cookies and authentication headers
  // optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Serve index.html for any route (SPA)
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });

}
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
