import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.json({ action: "GET all bookings" })
})

router.get("/:id", (req, res) => {
    res.json({ action: "GET booking", id: req.params.id })
})

router.post("/", (req, res) => {
    res.json({ action: "CREATE booking" })
})

router.delete("/:id", (req, res) => {
    res.json({ action: "DELETE booking", id: req.params.id })
})
router.put("/:id", (req, res) => {
    res.json({action: "Edited booking", id: req.params.id})
})

export default router