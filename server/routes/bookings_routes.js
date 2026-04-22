// import express from "express"
// import {isAdmin,ownerShip} from "../middleware/users_roles"

// const router = express.Router()

// router.get("/", isAdmin, (req, res) => {
//     res.json({ action: "GET all bookings" })
// })

// router.get("/:id",ownerShip, (req, res) => {
//     res.json({ action: "GET booking", id: req.params.id })
// })

// router.post("/",ownerShip, (req, res) => {
//     res.json({ action: "CREATE booking" })
// })

// router.delete("/:id", isAdmin, (req, res) => {
//     res.json({ action: "DELETE booking", id: req.params.id })
// })
// router.put("/:id", isAdmin, (req, res) => {
//     res.json({ action: "Edited booking", id: req.params.id })
// })

// export default router