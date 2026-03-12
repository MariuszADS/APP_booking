import http from "node:http"
import prisma from "./db/prismaClient.ts";
import express from "express"
import cors from "cors"
import helmet from "helmet"

const users = await prisma.user.findMany()
const services = await prisma.service.findMany()
const booking = await prisma.booking.findMany()

const port = 8000
const app = express()

// Security middleware
app.use(helmet(""))

//CORS config
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/users", (res, req) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

app.get("/services", (res, req) => {
    res.statusCode = 200
    res.end(JSON.stringify({route:services}))
})

app.get("/booking", (res, req) => {
    res.statusCode = 200
    res.end(JSON.stringify({route:booking}))
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
