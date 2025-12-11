import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "https://socket-talk-client.vercel.app","https://lightcyan-zebra-642482.hostingersite.com"], credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/test", (req, res) => {
  res.json({"message":"working"})
})



server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectDB();
});
