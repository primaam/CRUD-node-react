import cors from "cors";
import express from "express";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as notesRoutes } from "./routes/notesRoutes.js";
import { verifyToken } from "./middleware/verifyToken.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", notesRoutes);

export { app };
