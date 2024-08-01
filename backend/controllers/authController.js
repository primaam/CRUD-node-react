import bcrypt from "bcryptjs";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

const { v4: uuidv4 } = require("uuid");
const SECRET_KEY = "test";

const pool = new Pool({
    user: "notes_admin",
    host: "localhost",
    database: "mynotes",
    password: "admin",
    port: 5432,
});

const register = async (req, res) => {
    const { username, fullName, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.status(400).send("Password do not match");
    }

    try {
        const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userCheck.rows.length > 0) {
            return res.status(400).send("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();

        const newUser = await pool.query(
            "INSERT INTO users (id, username, full_name, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [id, username, fullName, hashedPassword]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(400).send("User not found");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).send("Invalid Password");
        }

        const token = jwt.sign(
            { id: user.rows[0].id, username: user.rows[0].username },
            SECRET_KEY,
            { expiresIn: "3d" }
        );

        res.status(200).json({
            token,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

export { register, login };
