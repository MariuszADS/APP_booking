import http from "node:http"
import prisma from "./db/prismaClient.ts";
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { json } from "node:stream/consumers";
import { getBooking } from "./controllers/booking_controller.js";
import { logger } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

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

app.use(express.json())

app.get("/welcome_page", (req, res) => {
    res.send("<p>Welcome page!</p>")
})

app.use("/service_date_time_booking", getBooking)

app.use(logger)

app.use(errorHandler)
// app.use("/booking_details")

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
