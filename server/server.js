import express from "express"
import cors from "cors"
import helmet from "helmet"
import { getBooking, getSingleBooking, createBooking, deleteBooking, editBooking } from "./controllers/booking_controller.js";
import { getService, getSingleService, createService, deleteService } from "./controllers/service_controller.js";
import { logger } from "./middleware/logger_middleware.js";
import { connectDB } from "./db/prismaClient.js"
import { isAdmin, ownerShip } from "./middleware/users_roles.js";
import { login ,register} from "./controllers/JWT_controller.js";

const port = 8000
const app = express()
const router = express.Router()

connectDB();

//MIDDLEWARE
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(helmet())
app.use(express.json())
app.use(logger)
app.use("/auth", router)

//AUTHORISATION
router.post("/register",register)
router.post("/login", login)

/*SERVICE */
app.get("/services", getService)
app.get("/services/:id", getSingleService)
app.post("/services", createService)
app.delete("/services/:id", deleteService)
// GET /services 
router.get("/", isAdmin, (req, res) => {
    res.json({ action: "GET all services" })
})
// GET /services/:id
router.get("/:id", isAdmin, (req, res) => {
    res.json({ action: "GET one service", id: req.params.id })
})
// POST /services
router.post("/", (req, res) => {
    res.json({ action: "CREATE service", body: req.body })
})
// PUT /services/:id
router.put("/:id", isAdmin, (req, res) => {
    res.json({ action: "UPDATE service", id: req.params.id })
})
// DELETE /services/:id
router.delete("/:id", isAdmin, (req, res) => {
    res.json({ action: "DELETE service", id: req.params.id })
})

/*BOOKING */
app.get("/booking", getBooking)
app.get("/booking/:id", getSingleBooking)
app.post("/booking", createBooking)
app.delete("/booking/:id", deleteBooking)
app.put("/booking/:id", editBooking)
//GET all
router.get("/", isAdmin, (req, res) => {
    res.json({ action: "GET all bookings" })
})
//GET : id
router.get("/:id", ownerShip, (req, res) => {
    res.json({ action: "GET booking", id: req.params.id })
})
//POST
router.post("/", ownerShip, (req, res) => {
    res.json({ action: "CREATE booking" })
})
//DELETE
router.delete("/:id", isAdmin, (req, res) => {
    res.json({ action: "DELETE booking", id: req.params.id })
})
//EDIT
router.put("/:id", isAdmin, (req, res) => {
    res.json({ action: "Edited booking", id: req.params.id })
})

//LISENER
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//404 client error handler
app.use((req, res) => {
    console.log(req.body);
    res.status(404).json({ message: "not found" })
})

//500 server error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Something went wrong" })
})