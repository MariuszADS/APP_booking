import express from "express"

const router = express.Router()

router.get("/booking_details",(res,req)=>{
    res.send("<p>booking_details page!</p>")
})