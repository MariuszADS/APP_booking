import express from "express"
import cors from "cors"
import helmet from "helmet"
import { getBooking, getSingleBooking ,createBooking,deleteBooking} from "./controllers/booking_controller.js";
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
//err during displaying: GET from /services return all data instead of data from service | to_fix => i think that /services should be /booking
app.use("/services", getBooking)
//err works only when /services are not in use | to_fix => i think that /services should be /booking
app.use("/services/:id", getSingleBooking)
//TO_FIX
app.use("/services",createBooking)
//NOT CHECKED
app.use("/service",deleteBooking)

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
