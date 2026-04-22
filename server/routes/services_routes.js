// import express from "express"
// import {isAdmin} from "../middleware/users_roles"

// const router = express.Router()

// // GET /services 
// router.get("/", isAdmin, (req, res) => {
//     res.json({ action: "GET all services" })
// })

// // GET /services/:id
// router.get("/:id", isAdmin, (req, res) => {
//     res.json({ action: "GET one service", id: req.params.id })
// })

// // POST /services
// router.post("/", (req, res) => {
//     res.json({ action: "CREATE service", body: req.body })
// })

// // PUT /services/:id
// router.put("/:id", isAdmin, (req, res) => {
//     res.json({ action: "UPDATE service", id: req.params.id })
// })

// // DELETE /services/:id
// router.delete("/:id", isAdmin, (req, res) => {
//     res.json({ action: "DELETE service", id: req.params.id })
// })

// export default router