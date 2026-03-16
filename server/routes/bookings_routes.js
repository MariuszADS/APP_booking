import express from "express"

const router = express.Router()
//create endpoint
router.get("/bookings_details",(res,req)=>{
    res.send("<p>booking_details page!</p>")
})