import jwt from "jsonwebtoken";

const SECRET_KEY = "test";

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("header ", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("invalid Token");
    }
};

export { verifyToken };
