import jwt from "jsonwebtoken";
import prisma from "../db/prismaClient.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const isBcryptHash = (password) => {
    return typeof password === "string" && password.startsWith("$2");
};

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
        const { password, name } = req.body
        const email = req.body.email?.trim().toLowerCase()

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email,name and password are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
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
        const { password } = req.body;
        const email = req.body.email?.trim().toLowerCase();

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        let isValidPassword = false;

        if (isBcryptHash(user.password)) {
            isValidPassword = await bcrypt.compare(password, user.password);
        }

        if (!isValidPassword && user.password === password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword }
            });
            isValidPassword = true;
        }

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = generateToken(user.id, user.role);
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return res.json({ message: "If account exists, reset link was sent" })
        }

        const resetToken = crypto.randomBytes(32).toString("hex")

        console.log(resetToken); //temporary

        const expiresAt = new Date(Date.now() + 1000 * 60 * 15) //in 15min

        await prisma.passwordResetToken.create({
            data: {
                token: resetToken,
                userId: user.id,
                expiresAt
            }

        })

        console.log(`Reset link: http://localhost:5173/reset-password?token=${resetToken}`);

        return res.json({
            message: "Reset token generated",
            resetLink: `http://localhost:5173/reset-password?token=${resetToken}`
        })
    }
    catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res, next) => {

    try {


        const { token, password } = req.body

        if (!token || !password) {
            return res.status(400).json({ message: "Token and password are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true }
        })

        if (!resetToken) {
            return res.status(400).json({ message: "invalid or expired token" })
        }
        if (resetToken.expiresAt < new Date()) {
            return res.status(400).json({ message: "Invalid or expired token" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword }
        })

        await prisma.passwordResetToken.delete({
            where: { token }
        })

        return res.json({ message: "Password changed successfully" })
    }
    catch (error) {
        next(error)
    }
}


export { generateToken, verifyToken, register, login, forgotPassword, resetPassword };
