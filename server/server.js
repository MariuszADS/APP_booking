import express from "express"
import cors from "cors"
import helmet from "helmet"
import { getBooking, getSingleBooking, createBooking, deleteBooking, editBooking } from "./controllers/booking_controller.js";
import { getService, getSingleService, createService, editService, deleteService } from "./controllers/service_controller.js";
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
/*SERVICE */
app.use("/services", getService)
app.use("/services/:id", getSingleService)
app.use("/services", createService)
//not checked if it works,added params
app.use("/service", deleteService)
//not checked if it works,added params
app.use("/service", editService)

/*BOOKING */
app.use("/booking", getBooking)
app.use("/booking/:id", getSingleBooking)
// add params
app.use("/booking", createBooking)
// add params
app.use("/booking", deleteBooking)
// add params
app.use("/booking", editBooking)

/*test toute*/
app.get("/welcome", (req, res) => {
    res.send("<p>Welcome page!</p>")
})
/*404 error handler */
app.use((req, res) => {
    res.status(404).json({ message: "not found" })
})
/*err server handler  */
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Something went wrong" })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
