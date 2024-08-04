import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
    createNote,
    deleteNote,
    getNotesById,
    getNotesPages,
    updateNote,
    getNotesCount,
} from "../controllers/notesController.js";

const router = express.Router();

router.post("/notes", verifyToken, createNote);
router.get("/notes", verifyToken, getNotesPages);
router.get("/notes/count/:user_id", verifyToken, getNotesCount);
router.get("/notes/:id", verifyToken, getNotesById);
router.put("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote);

export { router };
