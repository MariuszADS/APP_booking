import prisma from "../db/prismaClient"


const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Frobidden" })
    }
    next()
}

const ownerShip = async (req, res, next) => {
    
    
    const id = Number(req.params.id)
    const booking = await prisma.booking.findUnique({ where: id })

    if (!booking.userId) {
        res.status(404).json({ message: "Booking not found" })
    }
    if (req.user.admin === "admin") {
        return next()
    }
    if (booking.serviceId === req.user.id) {
        return next()
    }
    console.log("Ownership hit.");
    console.log("PARAM ID", req.params.id);
    console.log("USER ID", req.user);
    return res.status(403).json({ message: "Forbidden" })

}

export { isAdmin, ownerShip }