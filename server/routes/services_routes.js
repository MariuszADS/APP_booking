import express from "express"
// import { getBooking } from "../controllers/booking_controller"

const router = express.Router()
// create endpoint | getBooking not in used
router.get("/api/services", (res, req) => {
    res.json({ httpMethod: "get" })
})
router.post("/api/services", (res, req) => {
    res.json({ httpMethod: "post" })
})
router.put("/api/services", (res, req) => {
    res.json({ httpMethod: "put" })
})
router.delete("/api/services", (res, req) => {
    res.json({ httpMethod: "delete" })
})

export default router