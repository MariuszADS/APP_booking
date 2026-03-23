// import http from "node:http"
// import prisma from "./db/prismaClient.js";
import express from "express"
import cors from "cors"
import helmet from "helmet"
// import { json } from "node:stream/consumers";
import { getBooking } from "./controllers/booking_controller.js";
import { logger } from "./middleware/logger_middleware.js";
// import { errorHandler } from "./middleware/error_middleware.js";
import { connectDB } from "./db/prismaClient.js"


const port = 8000
const app = express()

connectDB();

// Security middleware
app.use(helmet())

//CORS config
app.use(cors({
    origin: 'http://localhost:5173',
}));

//body parsing middleware => ???
app.use(express.json())

//test toute
app.get("/welcome", (req, res) => {
    res.send("<p>Welcome page!</p>")
})

//404 error handler
app.use((req, res) => {
    res.status(404).json({ message: "not found" })
})

// err server handler 

app.use((err, req, res, next) => { console.error(err.stack) 
    res.status(500).json({message:"Something went wrong"})
})

//API routes
app.use(logger)
app.use("/services", getBooking)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
