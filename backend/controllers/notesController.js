import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: "notes_admin",
    host: "localhost",
    database: "mynotes",
    password: "admin",
    port: 5432,
});

const createNote = async (req, res) => {
    const { title, description, priority_level, finished_at } = req.body;
    const user_id = res.user.id;

    if (!user_id || !title) {
        return res.status(400).send("Missing some required data");
    }

    const priority = priority_level || 4;

    try {
        const result = await pool.query(
            "INSERT INTO notes (user_id, title, description, priority_level, finished_at) VALUES ($1 , $2, $3, $4, $5) RETURNING *",
            [user_id, title, description, priority, finished_at]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Server error");
    }
};

const getNotesPages = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const user_id = req.user.id;

    try {
        const result = await pool.query(
            "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
            [user_id, limit, offset]
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).send("Server error");
    }
};

const getNotesById = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
        const result = await pool.query(
            "SELECT * FROM notes WHERE id_notes = $1 AND user_id = $2",
            [id, user_id]
        );

        if (result.rows.length == 0) {
            return res.status(404).send("Note not found or you dont have access");
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send("Server error");
    }
};

const getNotesCount = async (req, res) => {
    const { user_id } = req.params;

    try {
        const result = await pool.query("SELECT COUNT(*) FROM notes WHERE user_id = $1", [user_id]);
        const count = result.rows[0].count;
        res.json({ count });
    } catch (error) {
        res.status(500).send("Server Error");
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority_level, is_finished, finished_at } = req.body;
    const user_id = req.user.id;

    try {
        const result = await pool.query(
            "UPDATE notes SET title = COALESCE($1, title), description = COALESCE($2, description), priority_level = COALESCE($3, priority_level), is_finished = COALESCE($4, is_finished), finished_at = COALESCE($5, finished_at) WHERE id_notes = $6 AND user_id = $7 RETURNING *",
            [title, description, priority_level, is_finished, finished_at, id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Note not found or you do not have access");
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
        const result = await pool.query(
            "DELETE FROM notes WHERE id_notes = $1 AND user_id = $2 RETURNING *",
            [id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Note not found or you do not have access");
        }

        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

export { createNote, getNotesById, getNotesPages, updateNote, deleteNote, getNotesCount };
