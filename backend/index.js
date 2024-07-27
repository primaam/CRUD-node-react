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

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        username,
        password,
    ]);
});
