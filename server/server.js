import http from "node:http"
import prisma from "./db/prismaClient.js";
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { json } from "node:stream/consumers";
import { getBooking } from "./controllers/booking_controller.js";
import { logger } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import connectDB from "./db"

const port = 8000
const app = express()

connectDB();

// Security middleware
app.use(helmet())

//CORS config
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//body parsing middleware => ???
app.use(express.json())

app.get("/api/starting_page", (req, res) => {
    res.send("<p>Welcome page!</p>")
})
//API routes
app.use("/api/services", getBooking)
// app.use("/api/services:id")

app.use(logger)

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

// app.use(errorHandler)
// app.use("/booking_details")

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
