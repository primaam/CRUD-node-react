import cors from "cors";
import express from "express";
import { router as authRoutes } from "./routes/authRoutes";
import { router as notesRoutes } from "./routes/notesRoutes";

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
