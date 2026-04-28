import prisma from "../db/prismaClient.js";
import { verifyToken } from "../controllers/JWT_controller.js";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Access token required" })
    }
    const decoded = verifyToken(token)
    if (!decoded) {
        return res.status(403).json({ message: "Invalid or expired token" })
    }
    req.user = decoded
    next()
}
//role validation for admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("Req handled by admin");
    next();
};
//validation for ownership
const ownerShip = async (req, res, next) => {
    const id = Number(req.params.id);
    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    if (req.user.role === "admin") {
        return next();
    }
    if (booking.userId === req.user.id) {
        return next();
    }
    console.log("Ownership check failed");
    return res.status(403).json({ message: "Forbidden" });
};

export { isAdmin, ownerShip, authenticateToken };