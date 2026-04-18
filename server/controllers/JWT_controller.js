import jwt from "jsonwebtoken";
import prisma from "../db/prismaClient.js";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Generate JWT token
const generateToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role: role },
        JWT_SECRET,
        { expiresIn: "24h" }
    );
};

// Verify token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// Login function
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials email" });
        }

        // Compare password with hashed password
        // const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials password" });
        }

        // Generate token
        const token = generateToken(user.id, user.role);
        res.json({ token, userId: user.id, role: user.role });
    } catch (error) {
        next(error);
    }
};

export { generateToken, verifyToken, login };