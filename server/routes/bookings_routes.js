import express from "express"

const router = express.Router()

router.get("/bookings_details", (res, req) => {
    res.json({ httpMethod: "get" })
})

// router.post("/api/bookings_details", (req, res) => {
//     res.json({ httpMethod: "post" })
// })

// router.put("/api/bookings_details", (req, res) => {
//     res.json({ httpMethod: "put" })
// })

// router.delete("/api/bookings_details", (req, res) => {
//     res.json({ httpMethod: "delete" })
// })