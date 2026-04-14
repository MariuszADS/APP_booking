import jwt from "jsonwebtoken"
import prisma from "../db/prismaClient";


const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

//generated JWT based on userId and role, which expires in 24h
const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role: role }),
        JWT_SECRET,
        { expiresIn: "24h" }
}
//verifing token based on JWT_SECRET
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) { return res.status(401).json({ message: "Invalid credentials" }) }

    const inValidPassword = await prisma.user.findUnique({ where: { password } })
    if (!inValidPassword) { return res.status(401).json({ message: "Invalid credentials" }) }

    const token = generateToken(user.id, user.role)
    res.json({ token })
}



export { generateToken, verifyToken, login }

