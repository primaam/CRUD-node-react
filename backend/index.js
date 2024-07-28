// const express = require("express");
// const cors = require("cors");

import express from "express";
import cors from "cors";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const port = 5432;
// const saltRounds = 10
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "todo_db",
    password: "admin",
    port: `${port}`,
});

// register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        username,
        password,
    ]);
    res.status(201).send("User Registered");
});

// login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id }, "token", { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).send("Invalid Credentials");
    }
});

// middleware
const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send("No Token Provided");
    }

    jwt.verify(token, "token", (err, decoded) => {
        if (err) {
            return res.status(500).send("failed to authenticate token");
        }
        req.userId = decoded.id;
        next();
    });
};

// CRUD
app.get("/todos", authenticate, async (req, res) => {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.userId]);
    res.json(result.rows);
});

app.post("/todos", authenticate, async (req, res) => {
    const { title, priority } = req.body;
    await pool.query("INSERT INTO todos (user_id, title, priority) VALUES ($1, $2, $3)", [
        req.userId,
        title,
        priority,
    ]);
    res.status(201).send("todos added");
});

app.put("/todos/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, priority, completed } = req.body;

    await pool.query(
        "UPDATE todos SET title = $1, priority = $2, completed = $3 WHERE id = $4 AND user_id = $5",
        [title, priority, completed, id, req.userId]
    );
    res.send("Todo Updated");
});

app.delete("/todos/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [id, req.userId]);
    res.send("Todo Deleted");
});

app.listen(5000, () => {
    console.log("server running on port 5000");
});
