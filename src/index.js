import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import Message from "./models/message.model.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "https://socket-talk-client.vercel.app","https://lightcyan-zebra-642482.hostingersite.com"], credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/getmessages", async (req, res) => {
  const messages = await Message.find({});
  res.json({"message" : messages});
})
app.get("/test1", (req, res) => {
  res.json({"message":"working"})
})
app.get("/getvehicles", async (req, res) => {
  try {
    const response = await fetch('https://masonshop.in/api/rentalvehicle');
    const data = await response.json();
    res.json({"vehicles": data});
  } catch (error) {
    res.json({"error": "Failed to fetch vehicles"});
  }
});


server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectDB();
});
