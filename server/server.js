import express from "express"
import cors from "cors"
import helmet from "helmet"
import { getBooking, getSingleBooking, createBooking, deleteBooking, editBooking } from "./controllers/booking_controller.js";
import { getService, getSingleService, createService, deleteService } from "./controllers/service_controller.js";
import { logger } from "./middleware/logger_middleware.js";
import { connectDB } from "./db/prismaClient.js"


const port = 8000
const app = express()

connectDB();

//middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(helmet())
app.use(express.json())
app.use(logger)

//err server handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Something went wrong" })
})
/*SERVICE */
app.get("/services", getService)
app.get("/services/:id", getSingleService)
app.post("/services", createService)
app.delete("/services/:id", deleteService)

/*BOOKING */
app.get("/booking", getBooking)
app.get("/booking/:id", getSingleBooking)
app.post("/booking", createBooking)
app.delete("/booking/:id", deleteBooking)
app.put("/booking/:id", editBooking)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
//404 error handler
app.use((req, res) => {
    res.status(404).json({ message: "not found" })
})
