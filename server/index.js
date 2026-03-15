import http from "node:http"
import prisma from "./db/prismaClient.ts";
import express from "express"
import cors from "cors"
import helmet from "helmet"


const port = 8000
const app = express()

// Security middleware
app.use(helmet())

//CORS config
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/api/users", async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.get("/services",async(req,res)=>{
    const services = await prisma.service.findMany()
    await res.json(services)
})

app.get("/booking",async (req,res)=>{
    const booking = await prisma.booking.findMany()
    res.json(booking)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
