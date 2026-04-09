import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import prisma from "../db/prismaClient.js"

//register fun
export const register = async (req, res) => {
    const { email, password } = req.body

    //hash method
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: "user"
        }
    })
    res.json(user)
}

export const login = async (req,res)=>{
    // ...
}