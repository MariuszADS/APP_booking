import express from "express"
import { getBooking } from "../controllers/booking_controller"

const router = express.Router()

router.get("/service_date_time_booking", getBooking, (res, req) => {
    res.send("<p>service_date_time_booking page!</p>")
})

export default router