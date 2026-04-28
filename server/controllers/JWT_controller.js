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

const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email,name and password are required" })
        }
        
        const existingUser = await prisma.user.findUnique({ where: { email } })
        
        if (existingUser) {
            return res.status(409).json({ message: "User already  extist" })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                role: "user",
                password: hashedPassword
            }
        
        })
        return res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        })
    }
    catch (error) {
        next(error)
    }

}

// Login function
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials email" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
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

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"]
//     const token = authHeader && authHeader.split(" ")[1]
//     if (!token) {
//         return res.status(401).json({ message: "Access token required" })
//     }
//     const decoded = verifyToken(token)
//     if (!decoded) {
//         return res.status(403).json({ message: "Invalid or expired token" })
//     }
//     req.user = decoded
//     next()
// }

export { generateToken, verifyToken, register, login };
