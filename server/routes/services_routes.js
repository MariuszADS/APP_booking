import express from "express"

const router = express.Router()

// GET /services → wszystkie
router.get("/services", (req, res) => {
    res.json({ action: "GET all services" })
})

// GET /services/:id → jeden
router.get("/services/:id", (req, res) => {
    res.json({ action: "GET one service", id: req.params.id })
})

// POST /services → create
router.post("/", (req, res) => {
    res.json({ action: "CREATE service", body: req.body })
})

// PUT /services/:id → update
router.put("/:id", (req, res) => {
    res.json({ action: "UPDATE service", id: req.params.id })
})

// DELETE /services/:id → delete
router.delete("/:id", (req, res) => {
    res.json({ action: "DELETE service", id: req.params.id })
})

export default router